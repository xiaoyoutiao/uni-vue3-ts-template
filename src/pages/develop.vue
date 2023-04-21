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
      <button @click="navigateToByOptions">navigateToByOptions</button>
      <button @click="navigateToByString">navigateToByString</button>
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
  uni.navigateTo({ url: PageEnum.Home })
}

const navigateToByString = () => {
  uni.navigateTo(PageEnum.Home)
}
</script>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 32rpx;
}
</style>
