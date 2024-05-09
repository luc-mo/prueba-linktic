<script lang="ts">
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { appStore } from '@/store/app-store'
  import { ProductsService } from '@/services/products'

  import NavbarButtons from '@/components/navbar-buttons.svelte'
  import Product from '@/components/product.svelte'
  import ProductModal from '@/components/product-modal.svelte';

  let products: ProductEntity[] = []
  let isProductModalOpen = writable(false)

  const handleProducts = async() => {
    try {
      appStore.set({ loading: true })
      const response = await ProductsService.getAllProducts()
      products = response.products
    } catch (error) {
      console.error(error)
    } finally {
      appStore.set({ loading: false })
    }
  }

  const handleAddNewProduct = () => isProductModalOpen.set(true)
  const handleCancel = () => isProductModalOpen.set(false)

  const handleAddToCart = () => {
    console.log('Added to cart')
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
    <NavbarButtons
      handleAddNewProduct={handleAddNewProduct}
    />
  </header>
  <main class="grid grid-cols-[repeat(auto-fill,20rem)] gap-6">
    {#each products as product}
      <Product
        name={product.name}
        price={product.price}
        onAddToCart={handleAddToCart}
      />
    {/each}
  </main>
  <ProductModal
    open={isProductModalOpen}
    onAccept={() => {}}
    onCancel={handleCancel}
  />
</div>