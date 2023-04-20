<route lang="json">
{
  "style": {
    "navigationBarTitleText": "开发调试页面(禁止Git提交)"
  }
}
</route>

<template>
  <div>
    <BasicImg
      :size="[90, 90, 50]"
      type="avatar"
      src="https://resource-1253782344.cos.ap-guangzhou.myqcloud.com/miniapps/ui/lardmee/mp-consumer/default-avatar.png"
    />
    <!-- 
    <view>
      <button @click="setSrc">设置</button>
      <BasicImg class="w-10 h-10" :src="asyncSrc" />
    </view> -->
  </div>
</template>

<script setup lang="ts">
import BasicImg from '@/components/basic-img/BasicImg.vue'

// const asyncSrc = ref('')

// const setSrc = () => {
//   asyncSrc.value =
//     "https://resource-1253782344.cos.ap-guangzhou.myqcloud.com/miniapps/ui/lardmee/mp-consumer/default-avatar.png"
// }
</script>

<!-- <style scoped lang="scss"></style> -->
