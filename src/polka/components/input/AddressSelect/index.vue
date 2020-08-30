<template>
  <el-select :value="value" @input="e=>$emit('input',e)" placeholder="请选择地址">
    <el-option v-for="account in accounts" :key="account.address"
               :label="account.meta.name || account.address" :value="account.address">
      <address-mini :address="account.address"/>
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {useAccounts} from "@/polka/hooks";
import AddressMini from "../../AddressMini.vue";
import {watchEffect, SetupContext, computed} from "@vue/composition-api";
import keyring from "@polkadot/ui-keyring";

export default {
    name: "AddressSelect",
    components: {
        AddressMini
    },
    props: {
        value: String,
    },
    setup(props: { value: string }, {emit}: SetupContext) {
        const addresses = useAccounts();
        watchEffect(() => {
            if (!props.value && addresses.value.length !== 0) {
                emit("input", addresses.value[0]);
            }
        });
        const accounts = computed(() => addresses.value.map(t => keyring.getAccount(t)));
        return {
            accounts
        };
    }
};
</script>

<style scoped>

</style>
