<template>
  <view id="safearea" class="safe-area-view" :class="{ fixed }" :style="safeAreaStyle">
    <slot name="top"></slot>
    <view :class="['safe-area-inner--' + props.position]">
      <slot></slot>
    </view>
    <slot name="bottom"></slot>
  </view>
</template>

<script setup lang="ts">
export interface BasicSafeareaProps {
  position?: 'top' | 'bottom'
  fixed?: boolean
  top?: number | string
  bottom?: number | string
  background?: string
}

const props = withDefaults(defineProps<BasicSafeareaProps>(), {
  position: 'bottom',
  background: 'transparent',
  fixed: false,
  bottom: 0,
  top: 0
})
const emit = defineEmits(['resize'])

const safeAreaStyle = computed(() => {
  if (props.position === 'top') {
    return { top: props.top, background: props.background }
  }

  if (props.position === 'bottom') {
    return { bottom: props.bottom, background: props.background }
  }
})

onMounted(() => {
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query
    .select('#safearea')
    .boundingClientRect((data) => {
      emit('resize', data)
    })
    .exec()
})
</script>

<style lang="scss" scoped>
.safe-area-view {
  left: 0;
  width: 750rpx;
}

.safe-area-inner {
  &--top {
    @include safe-area-inset-top(height);
  }

  &--bottom {
    @include safe-area-inset-bottom(height);
  }
}
</style>
