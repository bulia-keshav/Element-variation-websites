<script>
  import { onMount } from 'svelte';
  import { cart, currentFilter, products } from '../stores.js';
  import MultiLevelDropdown from './MultiLevelDropdown.svelte';
  import ProductCard from './ProductCard.svelte';
  
  let currentFilterValue = 'featured';
  let filteredProducts = [];
  let productsTitle = 'Featured Products';
  
  onMount(() => {
    currentFilter.subscribe(value => {
      currentFilterValue = value;
      updateFilteredProducts();
    });
    
    updateFilteredProducts();
  });
  
  function updateFilteredProducts() {
    if (currentFilterValue === 'featured') {
      productsTitle = 'Featured Products';
      filteredProducts = Object.entries(products).filter(([id, product]) => 
        ['headphones', 'smartwatch', 'tshirt', 'plant', 'candle'].includes(id)
      );
    } else {
      const [gender, subcategory, brand] = currentFilterValue.split('-');
      productsTitle = `${gender.charAt(0).toUpperCase() + gender.slice(1)} > ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} > ${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
      
      filteredProducts = Object.entries(products).filter(([id, product]) => 
        product.gender === gender && product.subcategory === subcategory && product.brand === brand
      );
    }
  }
  
  function handleFilter(event) {
    const { gender, subcategory, brand } = event.detail;
    currentFilter.set(`${gender}-${subcategory}-${brand}`);
  }
  
  function handleAddToCart(event) {
    const { productId } = event.detail;
    
    cart.update(currentCart => {
      const existing = currentCart.find(item => item.id === productId);
      if (existing) {
        existing.quantity++;
        return currentCart;
      } else {
        return [...currentCart, { id: productId, quantity: 1 }];
      }
    });
    
    alert('Added to cart!');
  }
</script>

<div>
  <h1 class="text-3xl font-bold text-amazon-blue mb-5">Shop Our Products</h1>
  
  <MultiLevelDropdown on:filter={handleFilter} />
  
  <div class="products-section">
    <h2 class="text-2xl font-semibold text-amazon-blue my-5">{productsTitle}</h2>
    
    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {#each filteredProducts as [productId, product] (productId)}
          <ProductCard {productId} on:addToCart={handleAddToCart} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-12 text-gray-600">
        No products found for this selection.
      </div>
    {/if}
  </div>
</div>
