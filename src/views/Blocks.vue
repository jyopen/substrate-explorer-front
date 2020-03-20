<template>
  <div class="home">
    <table-list path="/v1/blocks"
                :columns="columns"
                :normal-params="params"
    />
  </div>
</template>

<script lang="ts">
import {TableOptions, ViewTypes, ListRequestOptions} from "@/components/types";
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/TableList.vue";
import {Block} from "@/model";

@Component({components: {TableList}})
export default class Blocks extends Vue {
    public columns: TableOptions<Block>[] = [
        {label: "Block", prop: "number", type: ViewTypes.LINK, getPath: (row) => `/block/${row.number}`},
        {label: "Status", prop: "finalized"},
        {label: "Age", prop: "timestamp", type: ViewTypes.FRIENDLY_TIME},
        {label: "Extrinsics", prop: "extrinsicCount"},
        {label: "Events", prop: "eventCount"},
        {label: "Validator", prop: "author", type: ViewTypes.LINK, getPath: (row) => `/validator/${row.author}`},
        {label: "Block hash", prop: "hash"},
    ];
    public params: ListRequestOptions = {
        order: [["number", "DESC"]]
    };
}

</script>
