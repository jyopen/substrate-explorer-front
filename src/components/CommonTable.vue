<template>
  <el-table
      header-row-class-name="table-header"
      v-loading="loading"
      v-bind="nativeProps"
      :data="data"
  >
    <el-table-column
        v-for="item in columns"
        v-bind="item"
        :width="getTableWidth(item)"
        :label="item.label"
        :key="item.id"
        align="center">
      
      <template slot-scope="{row}">
        <friendly-time v-if="getType(item,row) === ViewTypes.FRIENDLY_TIME" :value="row[item.prop]"/>
        <el-link v-else-if="getType(item,row) === ViewTypes.LINK"
                 :underline="false"
                 type="primary"
                 class="single-line"
                 :href="getPath(item,row)">
          {{ formatValue(row[item.prop],item,row) }}
        </el-link>
        <format-balance v-else-if="getType(item,row)=== ViewTypes.BALANCE" :value="row[item.prop]"/>
        <div v-else class="single-line">
          {{ formatValue(row[item.prop],item,row) }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {TableOptions, ViewTypes} from "@/components/types";
import FriendlyTime from "./FriendlyTime.vue";
import FormatBalance from "./FormatBalance.vue";

@Component({components: {FriendlyTime, FormatBalance}})
export default class CommonTable<M> extends Vue {
    @Prop({type: Array, default: () => []})
    private readonly data: any[] | undefined;
    @Prop({type: Array, default: () => []})
    private readonly columns: TableOptions<M>[] | undefined;
    @Prop(Object)
    private readonly nativeProps: Object | undefined;
    @Prop({type: Boolean, default: false})
    private readonly loading: boolean | undefined;

    public ViewTypes = ViewTypes;

    public formatValue(value: string, item: TableOptions<M>, row: M) {
        switch (item.type) {
            default:
                return item.getValue ? item.getValue(row) : value;
        }
    }

    public getPath(item: TableOptions<M>, row: M) {
        if (!item.getPath) {
            return "";
        }
        return item.getPath(row);
    }

    public getType(item: TableOptions<M>, row: M): ViewTypes | undefined {
        if (item.getType && typeof item.getType === "function") {
            return item.getType(row);
        }
        return item.type;
    }


    public getTableWidth(item: TableOptions<M>) {
        if (item.width) {
            return item.width;
        }
        if (item.label.includes("时间") || item.label.includes("time") || item.type === ViewTypes.TIME) {
            return "180px";
        }
        switch (item.type) {
            case ViewTypes.FRIENDLY_TIME:
                return "160px";

        }
        return "";
    }
}

</script>


<style lang="stylus">


</style>
