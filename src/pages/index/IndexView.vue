<template>
  <view class="page-view">
    <view class="w-full text-app-primary flex justify-between px-2">
      Uni Vue3 TS
    </view>

    <p v-if="loading">loading...</p>
    <button @click="send()">发送</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { isResponseError } from '@/utils/request'

import { findAllTree } from '@/apis/lardmee-base'

const loading = ref(false)

const send = async () => {
  try {
    loading.value = true
    const resData = await findAllTree()
    console.log('请求成功 :>> ', resData)
  } catch (error) {
    if (isResponseError(error)) {
      console.error('请求失败', error)
      console.error('error.code :>> ', error.code)
    }
  } finally {
    loading.value = false
  }
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
