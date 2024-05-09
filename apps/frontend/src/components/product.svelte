<script lang="ts">
  import Button from './button.svelte'
  export let name: string;
  export let price: number;
  export let onAddToCart: () => void | Promise<void>;
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
        ${price.toFixed(2)}
      </span>
    </div>
    <div class="flex justify-between w-full">
      <Button
        type="button"
        variant="contained"
        onClick={onAddToCart}
      >
        Add to cart
      </Button>
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