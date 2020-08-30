<template>
  <el-button type="primary" :loading="loading" @click="onSubmit">
    提交
  </el-button>
</template>

<script lang="ts">
import {useApi} from "@/polka/hooks";
import {assert, isFunction} from "@polkadot/util";
import {ref} from "@vue/composition-api";
import keyring from "@polkadot/ui-keyring";
import {KeyringPair} from "@polkadot/keyring/types";
import {Message} from "element-ui";

function getPair(address?: string | null): KeyringPair | null {
    try {
        return keyring.getPair(address as string);
    } catch (e) {
        return null;
    }
}

export default {
    name: "TxButton",
    props: {
        params: Array,
        tx: String,
        signer: String,
    },
    setup(props: { tx: string, params: any[], signer: string }) {
        const api = useApi().value;
        const loading = ref(false);

        async function onSubmit() {
            const pair = getPair(props.signer);
            assert(pair, "Signer is not found");
            const [section, method] = (props.tx || "").split(".");
            assert(api?.tx[section] && api.tx[section][method], `Unable to find api.tx.${section}.${method}`);
            const extrinsic = api.tx[section][method](...(
                isFunction(props.params)
                    ? props.params()
                    : (props.params || [])
            ));
            assert(extrinsic, "Expected generated extrinsic passed to TxButton");
            loading.value = true;
            const unsub = await extrinsic.signAndSend(pair, (result) => {
                Message.success(`Transaction submit success`);
                console.log(`Current status is ${result.status}`);
                if (result.status.isInBlock) {
                    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
                    Message.info(`Transaction included at blockHash ${result.status.asInBlock}`);
                    loading.value = false;
                } else if (result.status.isFinalized) {
                    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                    Message.success(`Transaction finalized at blockHash ${result.status.asFinalized}`);
                    unsub();
                } else if (result.status.isInvalid || result.isError) {
                    console.log(`Transaction Error`);
                    Message.error(`Transaction Error`);
                    unsub();
                    loading.value = false;
                }
            });
        }

        return {
            onSubmit,
            loading
        };
    },
};
</script>

