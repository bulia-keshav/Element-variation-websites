<script>
  import { createEventDispatcher } from 'svelte';
  import { products } from '../stores.js';
  
  const dispatch = createEventDispatcher();
  
  export let productId;
  
  $: product = products[productId];
  
  function addToCart() {
    dispatch('addToCart', { productId });
  }
</script>

<div class="bg-white rounded-lg p-5 shadow-lg transform hover:-translate-y-1 transition-transform">
  <div class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs mb-2 inline-block">
    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
  </div>
  <h3 class="text-amazon-blue font-semibold mb-2">{product.name}</h3>
  <div class="mb-2">
    <div class="text-gray-600 text-sm mb-2">{product.description}</div>
    <div class="text-lg font-bold text-amazon-red">${product.price}</div>
    <div class="text-amazon-orange my-1">★★★★☆ {product.rating}</div>
  </div>
  <button 
    class="bg-amazon-orange text-black border-none px-5 py-2.5 rounded cursor-pointer font-bold w-full hover:bg-amazon-orange-dark transition-colors"
    on:click={addToCart}
  >
    Add to Cart
  </button>
</div>
