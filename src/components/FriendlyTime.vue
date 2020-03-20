<template>
  <span>{{time}}</span>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {formatFriendlyTime} from "@/utils/format";

@Component
export default class FriendlyTime extends Vue {
    @Prop(Number)
    private readonly value: number | undefined;
    private timeNow = Date.now();
    private timer: number | undefined;

    get time() {
        return formatFriendlyTime(this.value!, this.timeNow);
    }

    mounted(): void {
        this.timer = setInterval(() => this.timeNow = Date.now(), 1000);
    }

    beforeDestroy(): void {
        this.timer && clearInterval(this.timer);
    }
}

</script>

<style scoped>

</style>
