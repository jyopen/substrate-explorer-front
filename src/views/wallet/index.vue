<template>
  <api-provider>
    <wallet/>
  </api-provider>
</template>

<script lang="ts">

import Wallet from "./Wallet.vue";
import {ApiProvider} from "@/polka";

export default {
    name: "WalletProvider",
    components: {
        Wallet,
        ApiProvider
    },
};
</script>

<style scoped>

</style>
