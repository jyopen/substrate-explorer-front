import {ApiPromise, WsProvider} from '@polkadot/api';
import {isWeb3Injected, web3Accounts, web3Enable} from '@polkadot/extension-dapp';
import {InjectedAccountWithMeta} from '@polkadot/extension-inject/types';
import {isTestChain} from '@polkadot/util';
import keyring from '@polkadot/ui-keyring';
import {createType} from '@polkadot/types';
import {
    createElement,
    defineComponent,
    onBeforeUnmount,
    onMounted,
    provide,
    Ref,
    ref,
} from '@vue/composition-api';

let isKeyingLoaded = false;

const injectedPromise = web3Enable('substrate-explorer');

interface InjectedAccountExt {
    address: string;
    meta: {
        name: string;
        source: string;
    };
}

export interface State {
    isApiReady: boolean;
    isDevelopment: boolean;
    isApiConnection?: boolean;
    isSubstrateV2: boolean;
    isWaitingInjected?: boolean;
    systemChain: string;
    injectedAccounts: InjectedAccountWithMeta[];
    systemName: string;
    systemVersion: string;
}

export const ApiStateSymbol = Symbol('ApiState');
export const ApiSymbol = Symbol('Api');
export const defaultState: State = {
    isApiReady: false,
    isDevelopment: false,
    isApiConnection: false,
    isSubstrateV2: false,
    isWaitingInjected: isWeb3Injected,
    systemChain: '',
    injectedAccounts: [],
    systemName: '',
    systemVersion: '',
};


async function loadOnReady(api: ApiPromise): Promise<State> {
    // tslint:disable-next-line:variable-name
    const [properties, _systemChain, _systemName, _systemVersion, injectedAccounts] = await Promise.all([
        api.rpc.system.properties(),
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version(),
        web3Accounts().then((accounts): InjectedAccountExt[] =>
            accounts.map(({address, meta}): InjectedAccountExt => ({
                address,
                meta: {
                    ...meta,
                    name: `${meta.name} (${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
                },
            })),
        ),
    ]);
    const ss58Format = properties.ss58Format.unwrapOr(createType(api.registry, 'u32', 42)).toNumber();
    const tokenSymbol = properties.tokenSymbol.unwrapOr(undefined)?.toString();
    const tokenDecimals = properties.tokenDecimals.unwrapOr(createType(api.registry, 'u32', 12)).toNumber();
    const systemChain = _systemChain
        ? _systemChain.toString()
        : '<unknown>';
    const isDevelopment = isTestChain(systemChain);
    if (!isKeyingLoaded) {
        keyring.loadAll({
            genesisHash: api.genesisHash,
            isDevelopment,
            ss58Format,
            type: 'ed25519',
        }, injectedAccounts);
        isKeyingLoaded = true;
    }

    console.log('api: found chain', systemChain, JSON.stringify(properties));

    const isSubstrateV2 = !!Object.keys(api.consts).length;

    return {
        isApiReady: true,
        isDevelopment,
        isSubstrateV2,
        systemChain,
        injectedAccounts,
        systemName: _systemName.toString(),
        systemVersion: _systemVersion.toString(),
    };
}


export default defineComponent({
    setup(props, {slots}) {
        const api: Ref<ApiPromise | null> = ref(null);
        const state = ref<State>(defaultState);
        provide(ApiStateSymbol, state);
        provide(ApiSymbol, api);

        function connectedHandler() {
            state.value = {
                ...state.value,
                isApiConnection: true,
            };
        }

        function disconnectedHandler() {
            state.value = {
                ...state.value,
                isApiConnection: false,
            };
        }

        async function readyHandler() {
            const localState = await loadOnReady(api.value!);
            state.value = {
                ...state.value,
                ...localState,
            };
        }


        function createApi() {
            api.value = new ApiPromise({provider: new WsProvider('ws://127.0.0.1:9944/')});
            api.value.on('connected', connectedHandler);
            api.value.on('disconnected', disconnectedHandler);
            api.value.on('ready', readyHandler);
            injectedPromise
                .then(() => state.value = {...state.value, isWaitingInjected: false})
                .catch((error: Error) => console.error(error));
        }

        function destroyApi() {
            api.value!.off('connected', connectedHandler);
            api.value!.off('disconnected', disconnectedHandler);
            api.value!.off('ready', readyHandler);
        }

        onMounted(() => {
            createApi();
        });

        onBeforeUnmount(() => {
            destroyApi();
        });
        return () => createElement('div', slots.default ? slots.default() : undefined);
    },

});
