import accountObservable from '@polkadot/ui-keyring/observable/accounts';

import { onBeforeUnmount, onMounted, Ref, ref} from '@vue/composition-api';
import {Subscription} from 'rxjs';

export default function useAccounts(): Readonly<Ref<readonly string[]>> {
    let subscription: Subscription;
    const accounts = ref<string[]>([]);
    onMounted(() => {
        subscription = accountObservable.subject.subscribe((list) => {
            accounts.value = Object.keys(list);
        });
    });

    onBeforeUnmount(() => {
        subscription.unsubscribe();
    });

    return accounts;
}
