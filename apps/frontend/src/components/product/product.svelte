<script lang="ts">
  import Button from '@/components/button.svelte'
  import productImage from '@/assets/product.svg'

  export let id: string
  export let name: string
  export let price: number
  export let isAdmin: boolean
  export let onAddToCart: (productId: string) => void | Promise<void>
  export let onViewDetails: (productId: string) => void | Promise<void>
  export let onDelete: (productId: string) => void | Promise<void>

  const handleAddToCart = () => {
    onAddToCart(id)
  }

  const handleViewDetails = () => {
    onViewDetails(id)
  }

  const handleDelete = () => {
    onDelete(id)
  }
</script>

<article class="bg-gray-800 rounded-lg overflow-hidden">
  <section class="w-full h-48 bg-white p-8">
    <img
      class="w-full h-full"
      src={productImage}
      alt={name}
    />
  </section>
  <section class="w-full p-4">
    <div class="mb-2">
      <h2 class="text-xl text-gray-50 font-medium">
        {name}
      </h2>
      <span class="text-lg text-gray-400">
        ${price}
      </span>
    </div>
    <div class="flex justify-between w-full">
      <Button
        type="button"
        variant="outlined"
        onClick={handleViewDetails}
      >
        {isAdmin ? 'Edit' : 'View details'}
      </Button>
      {#if !isAdmin}
        <Button
          type="button"
          variant="contained"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      {:else}
        <Button
          type="button"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      {/if}
    </div>
  </section>
</article>