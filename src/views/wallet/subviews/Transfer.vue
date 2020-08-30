<template>
  <div>
    <p>转账</p>
    <el-form :model="form">
      <el-form-item lang="签名者">
        <el-select v-model="form.signer" placeholder="请选择签名账户">
          <el-option v-for="address in accounts" :key="address"
                     :label="address" :value="address"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item lang="接收地址">
        <el-input v-model="form.target" placeholder="请输入接收地址"/>
      </el-form-item>
      <el-form-item lang="金额">
        <el-input-number v-model="form.value" placeholder="请输入金额" :controls="false"/>
      </el-form-item>
      <el-form-item>
        <pa-tx-button tx="balances.transfer" :params="params" :signer="form.signer"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {useAccounts} from "@/polka/hooks";
import dec from "decimal.js";
import {ref, computed} from "@vue/composition-api";
import {PolkaComponents} from "@/polka";

export default {
    name: "Transfer",
    extends:PolkaComponents,
    setup() {
        const accounts = useAccounts();
        const form = ref<{ signer: string, target: string, value: number }>({
            signer: "",
            target: "",
            value: 0
        });
        const params = computed(() => [form.value.target, new dec(form.value.value).mul(new dec(10 ** 12)).toFixed(0)]);

        return {
            accounts,
            form,
            params,
        };
    }
};
</script>

<style scoped>

</style>
