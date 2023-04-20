<script setup lang="ts">
import { getDefinedEnvs } from '@/utils/config'

onLaunch(() => {
  const envs = getDefinedEnvs()
  console.log('App Launch')

  console.log('\n环境变量一览\n')
  console.table(envs)
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import './scss/app';
</style>
