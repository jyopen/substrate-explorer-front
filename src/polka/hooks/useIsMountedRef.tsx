// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {Ref, ref, onMounted, onBeforeUnmount} from '@vue/composition-api';

export default function useIsMountedRef(): Ref<boolean> {
    const isMounted = ref(false);
    onMounted(() => {
        isMounted.value = true;
    });
    onBeforeUnmount(() => {
        isMounted.value = false;
    });

    return isMounted;
}
