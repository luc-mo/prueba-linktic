<script lang="ts">
  import { onMount } from 'svelte'
  import { ProductsService } from '@/services/products'
  import Product from '@/components/product.svelte'

  let products: ProductEntity[] = []

  const handleProducts = async() => {
    try {
      const response = await ProductsService.getAllProducts()
      products = response.products
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddProduct = () => {
    console.log('Product added to cart')
  }

  onMount(() => {
    handleProducts()
  })
</script>

<div class="flex flex-col gap-10 p-10">
  <header>
    <h1 class="text-4xl font-bold tracking-wide">
      Products
    </h1>
  </header>
  <main class="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
    {#each products as product}
      <Product
        name={product.name}
        price={product.price}
        onAddToCart={handleAddProduct}
      />
    {/each}
  </main>
</div>