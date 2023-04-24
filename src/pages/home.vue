<route lang="json">
{
  "style": {
    "navigationBarTitleText": "tsssss",
    "navigationStyle": "custom"
  }
}
</route>

<template>
  <view class="page-view">
    <BasicPaging ref="basicPagingRef" v-model="list" refresherEnabled @query="queryList">
      <template #top>
        <view class="header">请求</view>
      </template>

      <view class="list">
        <view v-for="item in list" :key="item.id" class="a-item">{{ item.name }}</view>
      </view>
    </BasicPaging>
  </view>
</template>

<script setup lang="ts">
import { useQuery } from '@/composables/useQuery'

const { query } = useQuery()

interface Item {
  name: string
  id: number
}
const basicPagingRef = ref<InstanceType<BasicPaging>>(null)
const list = ref<Item[]>([])

const queryList = (pageNo: number, pageSize: number) => {
  const datas: Item[] = []
  console.log('pageNo :>> ', pageNo)
  console.log('pageSize :>> ', pageSize)
  for (let i = 0; i < pageNo * pageSize; i++) {
    datas.push({ id: i, name: '数据项' + (i + 1) })
  }

  basicPagingRef.value?.complete(datas)

  // list.value = datas
}

console.log('query :>> ', query)
</script>

<style lang="scss" scoped>
.item {
  vertical-align: middle;
  width: 100%;
  height: 112rpx;
  border-bottom: 1px solid rgba(170 173 174 / 30%);
  background: theme('colors.primary');
  font-size: 32rpx;
  line-height: 112rpx;
}

.header {
  width: 100%;
  height: 90rpx;
  background-color: theme('colors.primary');
  color: #fff;
  line-height: 90rpx;
  text-align: center;
}

.a-item {
  height: 300rpx;
  margin: 16rpx;
  background-color: #ccc;
  color: #fff;
  line-height: 300rpx;
}
</style>
