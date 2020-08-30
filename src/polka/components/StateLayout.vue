<template>
  <div>
    <div v-if="!state.isApiReady">api连接中</div>
    <div v-else>
      <div v-if="!state.isApiConnection">
        没有连接任何节点. 确保你的节点正在运行并且保证websocket终端可访问.
      </div>
      <div>
        <h3>基础信息</h3>
        <p>isSubstrateV2:{{state.isSubstrateV2}}</p>
        <p>systemChain:{{state.systemChain}}</p>
        <p>systemName:{{state.systemName}}</p>
        <p>systemVersion:{{state.systemVersion}}</p>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {useApiState} from "@/polka/hooks";

export default {
    name: "StateLayout",
    setup() {
        const state = useApiState();
        return {
            state,
        };
    }
};
</script>

<style lang="stylus" scoped>

</style>
