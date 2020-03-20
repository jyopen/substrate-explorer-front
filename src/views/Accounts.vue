<template>
  <table-list path="/v1/accounts"
              :columns="columns"
              :normal-params="params"
  />
</template>

<script lang="ts">
import {TableOptions, ViewTypes, ListRequestOptions} from "@/components/types";
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/TableList.vue";
import {Account} from "@/model";

@Component({components: {TableList}})
export default class Accounts extends Vue {
    public columns: TableOptions<Account>[] = [
        {label: "Account ID", prop: "accountId", type: ViewTypes.LINK, getPath: (row) => `/account/${row.accountId}`},
        {label: "Bounded", prop: "lockedBalance", type: ViewTypes.BALANCE},
        {label: "Balance", prop: "availableBalance", type: ViewTypes.BALANCE},
    ];
    public params: ListRequestOptions = {};
}

</script>
