<template>
  <div>
    <common-tabs :tabs="tabs">
      <table-list
          slot="extrans"
          path="/v1/blocks"
          :columns="columns"
          :normal-params="{order:[['number','DESC']]}"
      />
      <h1 slot="test">哈哈</h1>
    </common-tabs>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {TabOptions, ViewTypes} from "@/components/types";
import TableList from "@/components/TableList.vue";
import CommonTabs from "@/components/CommonTabs.vue";
import {TableOptions} from "@/components/types";
import {Block as BlockBean} from "@/model";

@Component({components: {TableList, CommonTabs}})
export default class Block extends Vue {
    private columns: TableOptions<BlockBean>[] = [
        {label: "Block", prop: "number"},
        {label: "Status", prop: "finalized"},
        {label: "Age", prop: "timestamp", type: ViewTypes.FRIENDLY_TIME},
        {label: "Extrinsics", prop: "extrinsicCount"},
        {label: "Events", prop: "eventCount"},
        {label: "Validator", prop: "author"},
        {label: "Block hash", prop: "hash"},
    ];

    private tabs: TabOptions[] = [
        {label: "交易", name: "extrans"},
        {label: "测试", name: "test"}
    ];
}

</script>
