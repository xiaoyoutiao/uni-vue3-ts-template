<template>
  <view class="page-view">
    <p ui-bg="primary" ui-w="375" ui-h="375" class="text-currency">{{ msg }}</p>
    <button @click="showString">showString</button>
    <button @click="showOpt">showOpt</button>
  </view>
</template>

<script setup lang="ts">
const msg = ref('Hello')
const showString = () => {
  uni.showToast('您的余额不足, 请返回首页及时充值')
}

const showOpt = () => {
  uni.showToast({
    title: '您的余额不足, 庆返回首页及时充值',
    onDelay: () => {
      console.log('推迟执行')
    }
  })
}
</script>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "tsssss"
  }
}
</route>

<style lang="scss" scoped>
.item {
  vertical-align: middle;
  width: 100%;
  height: 112rpx;
  border-bottom: 1px solid rgba(170 173 174 / 30%);
  background: theme('colors.primary');
  font-size: 32rpx;
  line-height: 112rpx;
}
</style>
