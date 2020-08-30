<template>
  <div>
    {{info}}
  </div>
</template>

<script lang="ts">
import {AccountInfo} from "@polkadot/types/interfaces";
import {useCall} from "@/polka/hooks";
import {computed, defineComponent} from "@vue/composition-api";

export default defineComponent({
    name: "AccountInfo",
    props: {
        value: String
    },
    setup(props: { value: string }) {
        const info = useCall<AccountInfo | null>(api => api.query.system.account, computed(() => [props.value]));
        return {
            info
        };
    },
});
</script>
