<script lang="ts">
  import { onMount } from 'svelte'
  import { get, writable } from 'svelte/store'

  import { appStore } from '@/store/app-store'
  import { userStore } from '@/store/user-store'
  import { orderStore } from '@/store/order-store'

  import { ProductsService } from '@/services/products'
  import { OrdersService } from '@/services/order'
  import { parseOrder } from '@/utils'

  import NavbarButtons from '@/components/navbar-buttons.svelte'
  import Product from '@/components/product/product.svelte'
  import ProductModal from '@/components/product/product-modal.svelte'
  import CartModal from '@/components/cart/cart-modal.svelte';

  let products: ProductEntity[] = []
  let isAdmin = writable(false)

  let productModalTitle = ''
  let productModalSubtitle = ''
  let selectedProduct = writable<ProductEntity | null>(null)
    
  let isProductModalOpen = writable(false)
  let isCartModalOpen = writable(false)

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

  const handleProductChange = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement
    selectedProduct.update(product => {
      if (!product) return null
      return { ...product, [name]: value }
    })
  }

  const handleAddNewProduct = () => {
    productModalTitle = 'Add new product'
    productModalSubtitle = 'Fill the form to add a new product.'
    selectedProduct.set({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: 1,
      stock: 1,
      enabled: true
    })
    isProductModalOpen.set(true)
  }

  const handleViewProduct = (productId: string) => {
    const product = products.find(product => product.id === productId)!
    console.log(product)
    productModalTitle = get(isAdmin) ? 'Edit product' : 'Product details'
    productModalSubtitle = get(isAdmin)
      ? 'Edit the product details.'
      : 'View the product details.'
    selectedProduct.set(product)
    isProductModalOpen.set(true)
  }

  const handleCancelViewProduct = () => {
    selectedProduct.set(null)
    isProductModalOpen.set(false)
  }

  const handleSaveProduct = async(event: SubmitEvent) => {
    try {
      event.preventDefault()
      appStore.set({ loading: true })
      
      const product = get(selectedProduct)!
      await ProductsService.saveProduct(product)

      const exists = products.find(p => p.id === product.id)
      products = exists
        ? products.map(p => p.id === product.id ? product : p)
        : [...products, product]
      selectedProduct.set(null)
    } catch (error) {
      console.error(error)
    } finally {
      isProductModalOpen.set(false)
      appStore.set({ loading: false })
    }
  }

  const handleDeleteProduct = async(productId: string) => {
    try {
      appStore.set({ loading: true })
      const product = products.find(product => product.id === productId)!
      await ProductsService.saveProduct({ ...product, enabled: false })
      products = products.filter(product => product.id !== productId)
    } catch (error) {
      console.error(error)
    } finally {
      appStore.set({ loading: false })
    }
  }

  const handleOpenCart = () => isCartModalOpen.set(true)
  const handleCloseCart = () => isCartModalOpen.set(false)

  const handleAddToCart = (productId: string) => {
    orderStore.update(order => {
      const quantity = order.products.get(productId) ?? 0
      order.products.set(productId, quantity + 1)
      return order
    })
  }

  const handleCreateOrder = async(event: SubmitEvent) => {
    try {
      event.preventDefault()
      appStore.set({ loading: true })

      const id = crypto.randomUUID()
      const products = parseOrder(get(orderStore).products)
      const shipped = false
      await OrdersService.saveOrder({ id, products, shipped })
      
      orderStore.set({ products: new Map() })
      isCartModalOpen.set(false)
    } catch (error) {
      console.error(error)
    } finally {
      appStore.set({ loading: false })
    }
  }

  onMount(() => {
    handleProducts()
    userStore.subscribe(user => {
      isAdmin.set(user?.role === 'admin')
    })
  })
</script>

<div class="flex flex-col gap-10 p-10">
  <header class="flex items-center justify-between">
    <h1 class="text-4xl font-bold tracking-wide">
      Products
    </h1>
    <NavbarButtons
      handleAddNewProduct={handleAddNewProduct}
      handleOpenCart={handleOpenCart}
    />
  </header>
  <main class="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
    {#each products as product}
      <Product
        id={product.id}
        name={product.name}
        price={product.price}
        isAdmin={get(isAdmin)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewProduct}
        onDelete={handleDeleteProduct}
      />
    {/each}
  </main>
  <ProductModal
    open={isProductModalOpen}
    product={selectedProduct}
    title={productModalTitle}
    subtitle={productModalSubtitle}
    isAdmin={isAdmin}
    onInput={handleProductChange}
    onAccept={handleSaveProduct}
    onCancel={handleCancelViewProduct}
  />
  <CartModal
    open={isCartModalOpen}
    products={products}
    onAccept={handleCreateOrder}
    onCancel={handleCloseCart}
  />
</div>