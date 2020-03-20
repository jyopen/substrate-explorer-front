<template>
  <table-list path="/v1/validators"
              :columns="columns"
              :normal-params="params"
  />
</template>

<script lang="ts">
import {TableOptions, ViewTypes, ListRequestOptions} from "@/components/types";
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/TableList.vue";
import {Validator} from "@/model";

@Component({components: {TableList}})
export default class Blocks extends Vue {
    public columns: TableOptions<Validator>[] = [
        {label: "Validator", prop: "accountId", type: ViewTypes.LINK, getPath: (row) => `/validator/${row.accountId}`},
        {label: "Self-Bonded", prop: "finalized"},
    ];
    public params: ListRequestOptions = {};
}

</script>
