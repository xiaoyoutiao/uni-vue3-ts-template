<route lang="json">
{
  "style": {
    "navigationBarTitleText": "开发调试页面(禁止Git提交)"
  }
}
</route>

<template>
  <view>
    <view>{{ JSON.stringify(location, null, 2) }}</view>

    <button @click="getLocation">获取位置</button>
  </view>
</template>

<script setup lang="ts">
const miniappStore = useMiniappStore()
const location = ref<UniApp.GetLocationSuccess | null>(null)

const getLocation = async () => {
  const res = await miniappStore.getLocationAsync({})
  location.value = res
}
</script>

<!-- <style scoped lang="scss"></style> -->
