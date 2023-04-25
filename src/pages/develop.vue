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

    <view>
      <text class="title">showLoading</text>
      <button @click="showLoading">showLoading</button>
    </view>

    <view>
      <text class="title">showModal</text>
      <button @click="showModal">showModal</button>
    </view>

    <view>
      <text class="title">{{ isLoading ? 'in loading' : '' }}</text>
      <text class="title">{{ isFinished ? 'isFinished' : '' }}</text>
      <text>{{ JSON.stringify(data) }}</text>
      <button @click="execute(23)">execute</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { basicHttp } from '@/utils/request'
import { useServerapi } from '@/composables/useApi'
import { getCats } from '@/apis'

const { data, isFinished, isLoading, execute } = useServerapi(getCats, { args: [11] })

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
  }

  await basicHttp.get('https://cat-fact.herokuapp.com/facts/random', null, {
    data: { did: 111, dname: 'ryudd' },
    query: { id: 222, name: 'ryu' },
    controller: controller
  })
}

const showLoading = () => {
  uni.showLoading('loadidndgd')
}

const showModal = () => {
  uni.showModal({
    title: '提示',
    editable: true,
    onConfirm: (content: string) => {
      console.log('showModal Confirm', content)
    }
  })
}
</script>

<style scoped lang="scss">
.title {
  font-weight: 600;
  font-size: 32rpx;
}
</style>
