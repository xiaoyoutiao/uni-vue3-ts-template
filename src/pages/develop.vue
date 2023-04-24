<route lang="json">
{
  "style": {
    "navigationBarTitleText": "开发调试页面(禁止Git提交)"
  }
}
</route>

<template>
  <view>
    <view>
      <text class="title">获取定位</text>
      <view>{{ JSON.stringify(location, null, 2) }}</view>
      <button @click="getLocation">获取位置</button>
    </view>

    <view>
      <text class="title">navigateTo拦截</text>
      <button @click="navigateToByOptions">To By Options</button>
      <button @click="navigateToByString">To By String</button>
    </view>
  </view>
</template>

<script setup lang="ts">
const miniappStore = useMiniappStore()
const location = ref<UniApp.GetLocationSuccess | null>(null)

const getLocation = async () => {
  const res = await miniappStore.getLocationAsync({})
  location.value = res
}

const navigateToByOptions = () => {
  uni.reLaunch({ url: PageEnum.Home, query: { id: 11 } })
}

const navigateToByString = () => {
  uni.switchTab(PageEnum.Home)
}
</script>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 32rpx;
}
</style>
