<template>
  <view class="page-view">
    <div class="w-112rpx text-32 bg-black text-white">测试文本</div>
    <UniList :border="false">
      <UniListItem>
        <template #body>
          <view class="item">
            <text>消息</text>
          </view>
        </template>
      </UniListItem>
    </UniList>
  </view>
</template>

<script setup lang="ts">
import UniList from '@ui/uni-list/uni-list.vue'
import UniListItem from '@ui/uni-list-item/uni-list-item.vue'
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
