<template>
  <view class="content">
    <UniBadge :text="9" />
    <DemoComp />
  </view>
</template>

<script setup lang="ts">
import UniBadge from "@ui/uni-badge/uni-badge.vue";
import DemoComp from "@/components/DemoComp.vue";

import { DynamicObject } from "#/utils";

interface Entity {
  name: string;
}

var a: Entity & DynamicObject = {
  name: "ryu",
  age: 1,
};

console.log("a :>> ", a);
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
