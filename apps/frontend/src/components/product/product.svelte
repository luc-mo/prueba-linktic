<script lang="ts">
  import Button from '@/components/button.svelte'
  export let id: string;
  export let name: string;
  export let price: number;
  export let isAdmin: boolean;
  export let onAddToCart: (productId: string) => void | Promise<void>;

  const handleAddToCart = () => {
    onAddToCart(id)
  }
</script>

<article class="bg-gray-800 rounded-lg overflow-hidden">
  <section class="w-full h-48 bg-white">
    <!-- TODO - add image -->
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
      {#if !isAdmin}
        <Button
          type="button"
          variant="contained"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      {/if}
      <!-- TODO - add view details button handler -->
      <Button
        type="button"
        variant="outlined"
        onClick={() => {}}
      >
        View details
      </Button>
    </div>
  </section>
</article>