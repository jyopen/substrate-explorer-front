import PaTxButton from './TxButton.vue';
import PaAccountBalance from './AccountBalance.vue';
import PaAccountInfo from './AccountInfo.vue';
import PaStateLayout from './StateLayout.vue';
import {PaAddressSelect, PaAddressInput, PaInputBalance} from './input';

export * from './provider/index';

export {
    PaTxButton,
    PaAccountBalance,
    PaAccountInfo,
    PaStateLayout,
    PaAddressSelect,
    PaAddressInput,
};


export const PolkaComponents = {
    components: {
        PaTxButton,
        PaAccountBalance,
        PaAccountInfo,
        PaStateLayout,
        PaAddressSelect,
        PaAddressInput,
        PaInputBalance,
    },
};
