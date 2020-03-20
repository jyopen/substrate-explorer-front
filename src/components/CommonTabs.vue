<template>
  <el-tabs v-model="activeName">
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
      <slot :name="tab.name"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator";
import {TabOptions} from "@/components/types";

@Component
export default class CommonTabs extends Vue {
    @Prop({
        type: Array,
        default: () => []
    })
    private readonly tabs!: TabOptions[];
    activeName: string = this.initialName();

    @Watch("activeName")
    private onActiveNameChange(vl: string) {
        location.hash = vl;
    }


    private initialName() {
        const name = location.hash.replace("#", "");
        return this.tabs.findIndex(t => t.name === name) > -1 ? name : (this.tabs[0] ? this.tabs[0].name : "");
    }


}
</script>
