<script lang="ts">
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'

  import { HttpClient } from '@/services/http-client'
  import { userStore } from '@/store/user-store'
  import { orderStore } from '@/store/order-store'

  import Button from '@/components/button.svelte'
  import Link from '@/components/link.svelte'

  let user = get(userStore) 
  let quantity = 0

  $: isAdmin = user?.role === 'admin'

  export let handleAddNewProduct: () => void

  const handleQuantity = (value: Map<string, number>) => {
    quantity = Array.from(value.values()).reduce((acc, curr) => acc + curr, 0)
  }

  const handleLogout = () => {
    HttpClient.removeAuthToken()
    userStore.set(null)
  }

  onMount(() => {
    userStore.subscribe((value) => { user = value })
    orderStore.subscribe((value) => handleQuantity(value.products))
  })
</script>

<div class="flex gap-4">
  {#if isAdmin}
    <Button variant="contained" onClick={handleAddNewProduct}>
      Add Product
    </Button>
  {:else}
    <Link href="/cart" variant="outlined">
      Cart ({quantity})
    </Link>
  {/if}
  {#if user}
    <Button variant="outlined" onClick={handleLogout}>
      Log Out
    </Button>
  {:else}
    <Link href="/login" variant="outlined">
      Log In
    </Link>
  {/if}
</div>