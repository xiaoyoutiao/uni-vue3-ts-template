interface UseServerapiOptions {
  args?: unknown[]
  immediate?: boolean
}

export function useServerapi<F extends AnyPromiseFn, R>(api: F, options: UseServerapiOptions) {
  const data = ref<R>()
  const isFinished = ref(false)
  const isLoading = ref(false)
  const isFail = ref(false)

  async function execute(...args: unknown[]) {
    try {
      args = args.length ? args : options.args?.length ? options.args : []

      isLoading.value = true
      isFinished.value = false
      isFail.value = false

      const res = await api(...args)

      data.value = res

      isFinished.value = true
    } catch (error) {
      isFail.value = true
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  if (options.immediate !== false) {
    execute()
  }

  return {
    data,
    isFinished,
    isLoading,
    isFail,
    execute
  }
}
