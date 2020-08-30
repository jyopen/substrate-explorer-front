import {inject, Ref, ref} from '@vue/composition-api';
import {ApiStateSymbol, defaultState, State} from '@/polka/components/provider/ApiProvider';


export default function useApiState(): Ref<State> {
    return inject<Ref<State>>(ApiStateSymbol, ref(defaultState));
}
