<script lang='ts'>
  import { onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  import Textfield from '@/components/textfield.svelte'
  import Button from '@/components/button.svelte'

  let dialogRef: HTMLDialogElement | null = null
  let selectedProduct: ProductEntity | null = null
  let isAdminUser = false

  export let open: Writable<boolean>
  export let product: Writable<ProductEntity | null>
  export let isAdmin: Writable<boolean>

  export let title: string
  export let subtitle: string

  export let onInput: (event: Event) => void
  export let onAccept: (event: SubmitEvent) => void
  export let onCancel: () => void

  const handleModal = (value: boolean) => {
    if(!dialogRef) return
    if (value) dialogRef.showModal()
    else dialogRef.close()
  }
  
  onMount(() => {
    const ref = document.getElementById("product-modal") as HTMLDialogElement
    dialogRef = ref
    
    if (open) {
      dialogRef.showModal()
    }

    open.subscribe(handleModal)
    product.subscribe((value) => { selectedProduct = value })
    isAdmin.subscribe((value) => { isAdminUser = value })
  })
</script>

<dialog
  id="product-modal"
  class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent overflow-hidden backdrop:bg-[rgba(0,0,0,0.4)]"
>
  <div class="bg-[#1f2937] text-[#fafafa] rounded-lg">
    <header class="px-8 pt-6 pb-0">
      <h3 class="mb-1 text-2xl font-semibold">
        {title}
      </h3>
      <p class="text-gray-300">
        {subtitle}
      </p>
    </header>
    <form on:submit={onAccept}>
      <section class="grid grid-cols-[auto_1fr] items-center gap-4 p-8">
        <label class="justify-self-end" for="name">
          Name
        </label>
        <Textfield
          name="name"
          placeholder="Product name"
          value={selectedProduct ? selectedProduct.name : ''}
          onInput={onInput}
          disabled={!isAdminUser}
          required
        />
        <label class="justify-self-end" for="description">
          Description
        </label>
        <Textfield
          name="description"
          placeholder="Product description"
          value={selectedProduct ? selectedProduct.description : ''}
          onInput={onInput}
          disabled={!isAdminUser}
          required
        />
        <label class="justify-self-end" for="price">
          Price
        </label>
        <Textfield
          name="price"
          placeholder="99"
          type="number"
          min="1"
          step="1"
          value={selectedProduct ? selectedProduct.price : ''}
          onInput={onInput}
          disabled={!isAdminUser}
          required
        />
        <label class="justify-self-end" for="stock">
          Stock
        </label>
        <Textfield
          name="stock"
          placeholder="100"
          type="number"
          min="1"
          step="1"
          value={selectedProduct ? selectedProduct.stock : ''}
          onInput={onInput}
          disabled={!isAdminUser}
          required
        />
      </section>
      <section class="flex items-center justify-end gap-4 px-8 pb-6">
        <Button variant="outlined" onClick={onCancel}>
          {isAdminUser ? 'Cancel' : 'Close'}
        </Button>
        {#if isAdminUser}
          <Button type="submit">
            Save
          </Button>
        {/if}
      </section>
    </form>
  </div>
</dialog>