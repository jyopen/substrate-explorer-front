<template>
  <el-autocomplete :value="value" @input="e=>$emit('input',e)" :fetch-suggestions="querySearch" placeholder="请选择地址">
    <template slot-scope="{ item }">
      <address-mini :address="item.value"/>
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import {useAccounts} from "@/polka/hooks";
import AddressMini from "../../AddressMini.vue";
import {SetupContext, computed} from "@vue/composition-api";
import keyring from "@polkadot/ui-keyring";

export default {
    name: "AddressInput",
    components: {
        AddressMini
    },
    props: {
        value: String,
    },
    setup(props: { value: string }, {emit}: SetupContext) {
        const addresses = useAccounts();
        const accounts = computed(() => addresses.value.map(t => keyring.getAccount(t)));

        function querySearch(queryString: string, cb: (filterList: any[]) => void) {
            cb(accounts.value.filter(t =>
                t?.address.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()) ||
                t?.meta.name.toLocaleLowerCase().includes(queryString.toLocaleLowerCase())).map(t => ({value: t?.address})));
        }

        return {
            accounts,
            querySearch
        };
    }
};
</script>

<style scoped>

</style>
