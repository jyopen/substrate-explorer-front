import {inject, Ref, ref} from '@vue/composition-api';
import {ApiSymbol} from '@/polka/components/provider/ApiProvider';
import ApiPromise from '@polkadot/api/promise';


export default function useApi(): Ref<ApiPromise | null> {
    return inject<Ref<ApiPromise | null>>(ApiSymbol, ref(null));
}
