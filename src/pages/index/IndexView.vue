<template>
  <view class="page-view">
    <view class="w-full text-app-primary flex justify-between px-2">
      Uni Vue3 TS
    </view>
  </view>
</template>

<script setup lang="ts">
import { StatusDef } from '@/config/enum'

StatusDef.Success
</script>

<style lang="scss" scoped>
.item {
  vertical-align: middle;
  width: 100%;
  height: 112rpx;
  border-bottom: 1px solid rgba(170 173 174 / 30%);
  background: theme('colors.app.primary');
  font-size: 32rpx;
  line-height: 112rpx;
}
</style>
