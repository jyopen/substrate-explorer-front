<template>
  <span>{{showValue}}</span>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {formatNumber} from "@/utils/format";

@Component
export default class FormatNumber extends Vue {
    @Prop({type: [Number, String]})
    private readonly value?: number | string;

    get showValue() {
        return formatNumber(this.value!);
    }

}

</script>

<style scoped>

</style>
