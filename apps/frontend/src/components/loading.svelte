<script lang='ts'>
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { appStore, type AppStore } from '@/store/app-store'

  const { loading } = get(appStore)
  let loadingRef: HTMLDialogElement | null = null

  const handleLoading = (value: AppStore) => {
    if(!loadingRef) return
    if(value.loading) loadingRef.showModal()
    else loadingRef.close()
  }

  onMount(() => {
    const ref = document.getElementById('loading') as HTMLDialogElement
    loadingRef = ref

    if(loading) {
      loadingRef.showModal()
    }

    appStore.subscribe(handleLoading)
  })
</script>

<dialog
  id="loading"
  class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent overflow-hidden backdrop:bg-[rgba(0,0,0,0.4)]"
>
  <div
    class="w-28 h-28 bg-transparent border-8 border-t-8 border-gray-200 border-t-gray-500 rounded-full animate-spin z-1"
  ></div>
</dialog>