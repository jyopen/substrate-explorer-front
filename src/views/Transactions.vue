<template>
  <table-list path="/v1/transactions"
              :columns="columns"
              :normal-params="params"
  />
</template>

<script lang="ts">
import {TableOptions, ViewTypes, ListRequestOptions} from "@/components/types";
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/TableList.vue";
import {Transaction} from "@/model";

@Component({components: {TableList}})
export default class Transactions extends Vue {
    public columns: TableOptions<Transaction>[] = [
        {label: "Transaction ID", prop: "id", type: ViewTypes.LINK, getPath: (row) => `/transaction/${row.id}`},
        {label: "Block", prop: "blockNumber", type: ViewTypes.LINK, getPath: (row) => `/block/${row.blockNumber}`},
        {label: "Hash", prop: "hash", type: ViewTypes.LINK, getPath: (row) => `/transaction/${row.hash}`},
        {label: "Age", prop: "timestamp", type: ViewTypes.FRIENDLY_TIME},
        {label: "Result", prop: "status"},
        {label: "Action", prop: "section", getValue: row => `${row.section}(${row.method})`},
    ];
    public params: ListRequestOptions = {
        order: [["blockNumber", "DESC"]]
    };
}

</script>
