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

    <basic-safearea>
      <template #top>
        <view class="text-center">版本: {{ miniappStore.version || '暂无' }}</view>
        <view v-if="miniappStore.envVersion !== 'release'" class="text-center mt-1">
          <text>标识: {{ miniappStore.version || '暂无' }} / </text>
          <text>{{ MpEnvEnum[appStore.definedEnvs.VITE_MP_ENV] }}环境</text>
        </view>
      </template>
    </basic-safearea>
  </view>
</template>

<script setup lang="ts">
import { sleep } from '@/utils'
import { MpEnvEnum } from '@/definitions'

const appStore = useAppStore()
const miniappStore = useMiniappStore()

onShow(async () => {
  await sleep(1500)
  uni.switchTab(PageEnum.Home)
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
