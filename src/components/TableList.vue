<template>
  <div class="card-view general-table">
    <section v-if="tableName" class="table-top">
      <span class="name">{{tableName}}</span>
      <router-link v-if="moreText" :to="moreLink" class="more">{{moreText}}<i class="el-icon-arrow-right"></i>
      </router-link>
    </section>
    <common-table
        :data="tableData"
        :columns="columns"
        :loading="loading"
        :nativeProps="nativeProps"
    >
      <template slot="header" slot-scope="{column}">
        <slot :column="column" :name="`${column.property}Header`">
          <div>{{ column.label }}</div>
        </slot>
      </template>
    </common-table>
    <pagination
        v-if="paging"
        :total="total"
        :current-page="ruleForm.currentPage"
        :page-size="ruleForm.pageSize"
        class="pages-list"
        @handle-size="handleSizeChange"
        @handle-current="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from "vue-property-decorator";
import {TableFilterOptions, ListRequestOptions, TableOptions, ListResponseType} from "@/components/types";
import Pagination from "./Pagination.vue";
import CommonTable from "./CommonTable.vue";
import {request} from "../utils";

@Component({components: {CommonTable, Pagination}})
export default class TableList<M> extends Vue {
    @Prop(Object)
    private readonly normalParams: TableFilterOptions | undefined;
    @Prop(Object)
    private readonly nativeProps: object | undefined;
    @Prop(String)
    private readonly tableName: string | undefined;
    @Prop(String)
    private readonly moreText: string | undefined;
    @Prop(String)
    private readonly moreLink: string | undefined;
    @Prop(String)
    private readonly path: string | undefined;
    @Prop(Number)
    private readonly timer: number | undefined;
    @Prop({type: Number, default: 20})
    private readonly pageSize!: number;
    @Prop({type: Boolean, default: true})
    private readonly paging: boolean | undefined;
    @Prop({type: Boolean, default: true})
    private readonly showLoading!: boolean;
    @Prop({type: Function})
    private readonly fetchData: ((params: ListRequestOptions) => Promise<any>) | undefined;
    @Prop({type: Function})
    private readonly handleData: ((params: any[]) => any[]) | undefined;
    @Prop({type: Array})
    private readonly columns: TableOptions<M>[] | undefined;
    private fetchTimer: number | undefined;
    private tableData: M[] = [];
    private loading = true;
    private total = 0;
    private ruleForm: TableFilterOptions = {
        pageSize: this.pageSize,
        currentPage: 1
    };

    get params(): ListRequestOptions {
        return {
            ...this.normalParams,
            limit: this.ruleForm.pageSize,
            offset: this.ruleForm.pageSize * (this.ruleForm.currentPage - 1)
        };
    }

    @Watch("normalParams")
    private onNormalParamsChange(val: TableFilterOptions, old: TableFilterOptions) {
        if (JSON.stringify(val) === JSON.stringify(old)) {
            return;
        }
        this.ruleForm = {
            ...this.ruleForm,
            ...val
        };
        this.loadData();
    }

    private loadData(showLoading = true) {
        this.loading = showLoading;
        const promise: Promise<ListResponseType<M>> = this.fetchData ? this.fetchData(this.params) : request({
            url: this.path,
            method: "post",
            data: this.params
        });
        promise.then(data => {
            this.tableData = this.handleData ? this.handleData(data.rows) : data.rows;
            this.total = data.count;
        }).finally(() => {
            this.loading = false;
        });
    }

    public handleSizeChange(val: number) {
        this.ruleForm.pageSize = val;
        this.loadData();
    }

    public handleCurrentChange(val: number) {
        this.ruleForm.currentPage = val;
        this.loadData();
    }

    created(): void {
        this.loadData(this.showLoading);
    }

    mounted(): void {
        if (this.timer) {
            this.fetchTimer = setInterval(() => {
                if (this.ruleForm.currentPage !== 1) {
                    return;
                }
                this.loadData(false);
            }, this.timer);
        }
    }

    beforeDestroy(): void {
        if (this.timer) {
            this.fetchTimer && clearInterval(this.fetchTimer);
        }
    }
}
</script>
<style lang="stylus">
  .general-table {
    width 100%
  }
  
  .table-top {
    height 45px
    background-color white
    display flex
    align-items center
    padding 0 20px 0 24px
    text-align left
    border-bottom rgba(0, 0, 0, 0.07) solid 1px
    
    .name {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
      line-height: 22px;
      flex 1
    }
    
    .more {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.38);
      line-height: 20px;
    }
  }
  
  .pages-list {
    height 81px
    display flex
    align-items center
    justify-content flex-end
    margin-right 20px
  }
</style>
