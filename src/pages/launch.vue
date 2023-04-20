<route lang="json">
{
  "type": "home",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>

<template>
  <view class="container">
    <image class="loading" src="@/static/launch-loading.png" />
    <text>正在启动，请稍候</text>

    <BasicSafearea>
      <template #top>
        <view class="text-center">版本: {{ miniProgram.version || '暂无' }}</view>
        <view v-if="miniProgram.envVersion !== 'release'" class="text-center">
          <text>标识: {{ miniProgram.version || '暂无' }} / </text>
          <text>{{ MpEnvEnum[envs.VITE_MP_ENV] }}环境</text>
        </view>
      </template>
    </BasicSafearea>
  </view>
</template>

<script setup lang="ts">
import BasicSafearea from '@/components/basic-safearea/BasicSafearea.vue'
import { getDefinedEnvs } from '@/utils/config'
import { sleep } from '@/utils'
import { MpEnvEnum } from '@/definitions'

const envs = getDefinedEnvs()
const { miniProgram } = uni.getAccountInfoSync()

onShow(async () => {
  await sleep(1500)
  uni.redirectTo({ url: PageEnum.Home })
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #999;
  font-size: 26rpx;

  .loading {
    @keyframes fade {
      0%,
      100% {
        opacity: 1;
        transform: scale(1);
      }

      50% {
        opacity: 0.7;
        transform: scale(0.96);
      }
    }

    width: 104rpx;
    height: 104rpx;
    margin-top: -400rpx;
    margin-bottom: 16rpx;
    animation: fade 2s ease-in-out infinite;
  }
}
</style>
