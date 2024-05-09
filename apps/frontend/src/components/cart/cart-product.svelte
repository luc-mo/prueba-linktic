<script lang="ts">
  export let name: string
  export let price: number
  export let quantity: number
  export let total: number
</script>

<div class="flex items-center justify-between w-full py-4 border-b border-gray-600 last-of-type:border-b-0">
  <div>
    <h3 class="text-lg font-semibold">
      {name}
    </h3>
    <span class="text-gray-300">
      ${price}
    </span>
  </div>
  <span>
    ${total} ({quantity})
  </span>
</div>