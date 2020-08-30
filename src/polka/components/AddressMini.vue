<template>
  <div class="item">
    <div class="left">
      <span>{{name}}</span>:
      <span>{{address}}</span>
    </div>
    <account-balance class="right" :address="address"/>
  </div>
</template>

<script lang="ts">
import keyring from "@polkadot/ui-keyring";
import AccountBalance from "./AccountBalance.vue";

export default {
    name: "AddressMini",
    components: {
        AccountBalance
    },
    props: {
        address: String,
    },
    setup(props: { address: string }) {
        const account = keyring.getAccount(props.address);
        return {
            name: account?.meta.name,
        };
    }
};
</script>

<style lang="stylus" scoped>
  .item {
    display flex
    
    .left {
      flex 1
      display flex
    }
    
    .right {
    
    }
  }
</style>
