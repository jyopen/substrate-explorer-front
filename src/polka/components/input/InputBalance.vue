<template>
  <el-input-number :value="showValue" @change="handlerChange" placeholder="请输入金额" :controls="false"/>
</template>

<script lang="ts">
import {SetupContext, computed} from "@vue/composition-api";
import dec from "decimal.js";

const DECIMALS_NUMBER = new dec(10).pow(new dec(12));
export default {
    name: "InputBalance",
    props: {
        value: String,
    },
    setup(props: { value: string }, {emit}: SetupContext) {
        const showValue = computed(() => new dec(props.value || "0").div(DECIMALS_NUMBER).toNumber());

        function handlerChange(v: number) {
            let realValue = new dec(v).mul(DECIMALS_NUMBER);
            if (!new dec(props.value).eq(realValue)) {
                emit("input", new dec(v).mul(DECIMALS_NUMBER).toFixed(0));
            }
        }

        return {
            showValue,
            handlerChange
        };
    }
};
</script>

<style scoped>

</style>
