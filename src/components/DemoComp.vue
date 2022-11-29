<template>
  <div>
    <div>{{ msg }}</div>
    <div v-if="hasBorder">has-bordrer1111</div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, withDefaults } from 'vue'

const msg = ref('Hi')

interface DemoCompProps {
  hasBorder: boolean
}

const props = withDefaults(defineProps<DemoCompProps>(), {
  hasBorder: true,
})

const { hasBorder } = toRefs(props)
</script>

<style scoped></style>
