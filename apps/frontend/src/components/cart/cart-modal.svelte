<script lang="ts">
  import { onMount } from 'svelte'
  import { get, type Writable } from 'svelte/store'

  import { orderStore } from '@/store/order-store'
  import { parseProductOrder } from '@/utils'

  import CartProduct from './cart-product.svelte'
  import Button from '@/components/button.svelte'

  let dialogRef: HTMLDialogElement | null = null
  let order = get(orderStore)
  let orderProducts: ReturnType<typeof parseProductOrder> = []
  let total = 0

  export let open: Writable<boolean>
  export let products: ProductEntity[]

  export let onAccept: (event: SubmitEvent) => void
  export let onCancel: () => void

  const handleModal = (value: boolean) => {
    if(!dialogRef) return
    if (value) dialogRef.showModal()
    else dialogRef.close()
  }

  onMount(() => {
    const ref = document.getElementById('cart-modal') as HTMLDialogElement
    dialogRef = ref
    
    if (open) {
      dialogRef.showModal()
    }

    open.subscribe(handleModal)
    orderStore.subscribe((value) => {
      order = value
      orderProducts = parseProductOrder(order.products, products)
      total = orderProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    })
  })
</script>

<dialog
  id="cart-modal"
  class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent overflow-hidden backdrop:bg-[rgba(0,0,0,0.4)]"
>
  <div class="min-w-[400px] bg-[#1f2937] text-[#fafafa] rounded-lg">
    <header class="px-8 pt-6 pb-0">
      <h3 class="text-2xl font-semibold">
        Cart
      </h3>
    </header>
    <form on:submit={onAccept}>
      <section class="px-8 py-4">
        {#each orderProducts as product}
          {#if product.quantity > 0}
            <CartProduct
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              total={product.price * product.quantity}
            />
          {/if}
        {/each}
      </section>
      <section class="flex items-center justify-between px-8 pb-6">
        <span>
          Total: ${total}
        </span>
        <div class="flex gap-2">
          <Button variant="outlined" onClick={onCancel}>
            Close
          </Button>
          <Button type="submit">
            Create Order
          </Button>
        </div>
      </section>
    </form>
  </div>
</dialog>