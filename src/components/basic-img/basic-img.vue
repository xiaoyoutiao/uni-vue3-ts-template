<template>
  <image
    :style="basicStyle"
    :src="src"
    :mode="props.mode"
    :webp="props.webp"
    :lazyLoad="props.lazyLoad"
    :showMenuByLongpress="props.showMenuByLongpress"
    :class="usedClass"
    @error="handleError"
    @load="handleLoad"
    @click="handleClick"
  ></image>
</template>

<script setup lang="ts">
/**
  @description 基础图片组件
  @author ryu.huang
 */

import { isNumber, isUnDef } from '@/utils'
import { basicImageTypes } from '@/settings/components'

import type { UniImageProps, BasicSizeTuple, BasicSizeType } from './type'

export interface BasicImgProps extends UniImageProps {
  radius?: number | string
  size?: BasicSizeType | BasicSizeTuple
  usedClass?: string | string[] | Record<string, string | number>
  type?: keyof typeof basicImageTypes
  placeholder?: string
  preview?: boolean
}

const props = withDefaults(defineProps<BasicImgProps>(), {
  lazyLoad: false,
  mode: 'scaleToFill',
  webp: false,
  showMenuByLongpress: false,
  radius: undefined,
  size: '',
  usedClass: '',
  type: undefined,
  placeholder: undefined
})
const emit = defineEmits(['error', 'load', 'click'])

const src = ref<string>(props.src)
const basicStyle = computed(() => {
  let width, height, radius

  if (Array.isArray(props.size)) {
    ;[width, height, radius] = props.size
  } else {
    width = props.size
    height = props.size
  }

  if (!isUnDef(props.radius)) {
    radius = props.radius
  }

  isNumber(width) && (width = width + 'rpx')
  isNumber(height) && (height = height + 'rpx')

  const styleObj = { width, height, borderRadius: radius }
  const resultObj = {}
  for (const key in styleObj) {
    if (styleObj[key] !== undefined || styleObj[key] !== '') {
      resultObj[key] = styleObj[key]
    }
  }
  return resultObj
})

watch(
  () => props.src,
  (url) => {
    if (url !== src.value) {
      src.value = url
    }
  }
)

const handleError = (event: unknown) => {
  if (props.placeholder) {
    src.value = props.placeholder
  } else if (props.type) {
    src.value = basicImageTypes[props.type]
  }
  emit('error', event)
}

const handleLoad = (event: unknown) => {
  emit('load', event)
}

const handleClick = () => {
  if (props.preview) {
    uni.previewImage({ urls: [src.value] })
  } else {
    emit('click')
  }
}
</script>
