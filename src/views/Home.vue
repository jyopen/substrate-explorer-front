<template>
  <div class="home">
    <table-list path="/v1/blocks" :columns="columns" :normal-params="{order:[['number','DESC']]}"/>
  </div>
</template>

<script lang="ts">
import {ViewTypes} from "@/components/types";
import {Component, Vue} from "vue-property-decorator";
import TableList from "@/components/TableList.vue";
import {TableOptions} from "@/components/types";
import {Block} from "@/model";

@Component({components: {TableList}})
export default class Home extends Vue {
    public columns: TableOptions<Block>[] = [
        {label: "区块高度", prop: "number"},
        {label: "是否结束", prop: "finalized"},
        {label: "时间", prop: "timestamp", type: ViewTypes.FRIENDLY_TIME},
    ];
}

</script>
