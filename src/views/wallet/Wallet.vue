<template>
  <pa-state-layout>
    <div>
      <p>转账</p>
      <el-form :model="form">
        <el-form-item lang="签名者">
          <pa-address-select v-model="form.signer"/>
        </el-form-item>
        <el-form-item lang="接收地址">
          <pa-address-input v-model="form.target"/>
        </el-form-item>
        <el-form-item lang="金额">
          <pa-input-balance v-model="form.value"/>
        </el-form-item>
        <el-form-item>
          <pa-tx-button tx="balances.transfer" :params="params" :signer="form.signer"/>
        </el-form-item>
      </el-form>
    </div>
  </pa-state-layout>
</template>

<script lang="ts">
import {useAccounts, useApiState} from "@/polka/hooks";
import dec from "decimal.js";
import {ref, computed} from "@vue/composition-api";
import {PolkaComponents} from "@/polka";

export default {
    name: "Wallet",
    extends: PolkaComponents,
    setup() {
        const state = useApiState();
        const accounts = useAccounts();
        const form = ref<{ signer: string, target: string, value: number }>({
            signer: "",
            target: "",
            value: '0'
        });
        const params = computed(() => [form.value.target, form.value.value]);

        return {
            state,
            accounts,
            form,
            params,
        };
    }
};
</script>

<style scoped>

</style>
