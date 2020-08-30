<template>
  <div>
    {{balance}}
  </div>
</template>

<script lang="ts">
import {AccountInfo} from "@polkadot/types/interfaces";
import {useCall} from "@/polka/hooks";
import {formatBalance} from "@/utils/format";
import {computed} from "@vue/composition-api";

export default {
    name: "AccountBalance",
    props: {
        address: String
    },
    setup(props: { address: string }) {
        const info = useCall<AccountInfo>(api => api.query.system.account, computed(()=>[props.address]));
        const balance = computed(() => formatBalance(info.value?.data.free.toString()));
        return {
            balance
        };
    },
};
</script>

<style scoped>

</style>
