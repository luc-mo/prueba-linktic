<script lang="ts">
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  import { appStore } from '@/store/app-store'
  import { orderStore } from '@/store/order-store'
  import { ProductsService } from '@/services/products'
  import { parseProductFormData } from '@/utils'

  import NavbarButtons from '@/components/navbar-buttons.svelte'
  import Product from '@/components/product.svelte'
  import ProductModal from '@/components/product-modal.svelte'

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
  const handleCancelNewProduct = () => isProductModalOpen.set(false)

  const handleSaveProduct = async(event: SubmitEvent) => {
    try {
      event.preventDefault()
      appStore.set({ loading: true })
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)

      const id = crypto.randomUUID()
      const data = parseProductFormData(formData)
      const product = { id, ...data }
      await ProductsService.saveProduct(product)

      products = [...products, product]
      form.reset()
    } catch (error) {
      console.error(error)
    } finally {
      isProductModalOpen.set(false)
      appStore.set({ loading: false })
    }
  }

  const handleAddToCart = (productId: string) => {
    orderStore.update(order => {
      const quantity = order.products.get(productId) ?? 0
      order.products.set(productId, quantity + 1)
      return order
    })
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
        id={product.id}
        name={product.name}
        price={product.price}
        onAddToCart={handleAddToCart}
      />
    {/each}
  </main>
  <ProductModal
    open={isProductModalOpen}
    onAccept={handleSaveProduct}
    onCancel={handleCancelNewProduct}
  />
</div>