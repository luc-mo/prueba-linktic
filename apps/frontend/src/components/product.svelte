<script lang="ts">
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
    <button
      class="flex items-center justify-center h-9 px-3 bg-gray-700 hover:bg-gray-600 text-sm font-medium rounded-md transition-colors"
      type="button"
      on:click={onAddToCart}
    >
      Add to cart
    </button>
  </section>
</article>