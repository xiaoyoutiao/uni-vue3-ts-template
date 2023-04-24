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

    <view>
      <text class="title">request get</text>
      <button @click="requestGet">request get</button>
      <button @click="cancelRequest">cancel request</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { basicHttp } from '@/utils/request'

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

let cancelRequest: () => Promise<void>

const requestGet = async () => {
  const controller = basicHttp.CancelController()

  cancelRequest = async () => {
    await controller.abort()
    const requestTask = await controller.source()
    console.log('requestTask :>> ', requestTask)
  }

  const res = await basicHttp.get(
    'https://dev-ldm-triratna.xdp8.cn/server/api/lardmee-base/basedistrict/getProvinces',
    null,
    {
      data: { did: 111, dname: 'ryudd' },
      query: { id: 222, name: 'ryu' },
      controller: controller
    }
  )
}
</script>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 32rpx;
}
</style>
