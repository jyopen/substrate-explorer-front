<template>
  <span>{{showValue}}</span>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {formatBalance} from "@/utils/format";

@Component
export default class FormatBalance extends Vue {
    @Prop({type: [Number, String]})
    private readonly value?: number | string;

    get showValue() {
        return formatBalance(this.value!);
    }

}

</script>

<style scoped>

</style>
