<script lang='ts'>
  import { onMount } from 'svelte'
  import type { Writable } from 'svelte/store'

  import Textfield from './textfield.svelte'
  import Button from './button.svelte'

  let dialogRef: HTMLDialogElement | null = null
  export let open: Writable<boolean>
  export let onAccept: (event: SubmitEvent) => void
  export let onCancel: () => void

  const handleModal = (value: boolean) => {
    if(!dialogRef) return
    if (value) dialogRef.showModal()
    else dialogRef.close()
  }
  
  onMount(() => {
    const ref = document.getElementById('new-product-modal') as HTMLDialogElement
    dialogRef = ref
    
    if (open) {
      dialogRef.showModal()
    }

    open.subscribe(handleModal)
  })
</script>

<dialog
  id="new-product-modal"
  class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent overflow-hidden backdrop:bg-[rgba(0,0,0,0.4)]"
>
  <div class="bg-[#1f2937] text-[#fafafa] rounded-lg">
    <header class="px-8 pt-6 pb-0">
      <h3 class="mb-1 text-2xl font-semibold">
        Add new product
      </h3>
      <p class="text-gray-300">
        Fill out the form below to add a new product.
      </p>
    </header>
    <form on:submit={onAccept}>
      <section class="grid grid-cols-[auto_1fr] items-center gap-4 p-8">
        <label class="justify-self-end" for="name">
          Name
        </label>
        <Textfield name="name" placeholder="Product name" required />
        <label class="justify-self-end" for="description">
          Description
        </label>
        <Textfield name="description" placeholder="Product description" required />
        <label class="justify-self-end" for="price">
          Price
        </label>
        <Textfield name="price" placeholder="99" type="number" min="1" step="1" required />
        <label class="justify-self-end" for="stock">
          Stock
        </label>
        <Textfield name="stock" placeholder="100" type="number" min="1" step="1" required />
      </section>
      <section class="flex items-center justify-end gap-4 px-8 pb-6">
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </section>
    </form>
  </div>
</dialog>