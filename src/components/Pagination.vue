<template>
  <div class="block">
    <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        :small="isMobile"
        :total="total"
        :layout="isMobile ? 'prev, pager, next':'total, sizes, prev, pager, next, jumper'"
        @size-change="handleSize"
        @current-change="handleCurrent"
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, Emit} from "vue-property-decorator";
import {isMobile} from "@/utils";

@Component
export default class Pagination extends Vue {
    @Prop({
        type: Number,
        default: 1
    })
    private readonly currentPage: number | undefined;

    @Prop({
        type: Number,
        default: 10
    })
    private readonly pageSize: number | undefined;
    @Prop({
        type: Number,
        default: 0
    })
    private readonly total: number | undefined;
    private isMobile = isMobile();

    @Emit()
    private handleSize(val: number) {
        return val;
    }

    @Emit()
    private handleCurrent(val: number) {
        return val;
    }
}
</script>
