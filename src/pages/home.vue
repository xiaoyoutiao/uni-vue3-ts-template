<route lang="json">
{
  "style": {
    "navigationBarTitleText": "tsssss"
  }
}
</route>

<template>
  <view class="page-view">
    <view class="w-full text-app-primary flex justify-between px-2"> Home </view>
    <p>{{ msg }}</p>
    <button @click="change">发送</button>
  </view>
</template>

<script setup lang="ts">
const msg = ref('Hello')
const change = async () => {
  uni.navigateTo({ url: PageEnum.Home })
}
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
