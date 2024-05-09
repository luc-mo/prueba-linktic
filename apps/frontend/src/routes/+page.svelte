<script lang="ts">
  import { onMount } from 'svelte'
  import { ProductsService } from '@/services/products'

  import NavbarButtons from '@/components/navbar-buttons.svelte'
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
    // TODO - Implement add product to cart
    console.log('Product added to cart')
  }

  onMount(() => {
    handleProducts()
  })
</script>

<div class="flex flex-col gap-10 p-10">
  <header class="flex items-center justify-between">
    <h1 class="text-4xl font-bold tracking-wide">
      Products
    </h1>
    <NavbarButtons/>
  </header>
  <main class="grid grid-cols-[repeat(auto-fill,20rem)] gap-6">
    {#each products as product}
      <Product
        name={product.name}
        price={product.price}
        onAddToCart={handleAddProduct}
      />
    {/each}
  </main>
</div>