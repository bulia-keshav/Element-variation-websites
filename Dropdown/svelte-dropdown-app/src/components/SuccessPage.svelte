<script>
  import { onMount } from 'svelte';
  import { lastOrder, currentPage, currentFilter, products } from '../stores.js';
  
  let orderData = { items: [], total: 0 };
  
  onMount(() => {
    lastOrder.subscribe(value => {
      orderData = value;
    });
  });
  
  function continueShopping() {
    currentFilter.set('featured');
    currentPage.set('products');
  }
</script>

<div class="text-center bg-white p-10 rounded-lg shadow-lg">
  <div class="text-6xl text-green-500 mb-5">✅</div>
  <h1 class="text-3xl font-bold text-amazon-blue mb-2.5">Congratulations!</h1>
  <p class="text-gray-600 mb-7">Your order has been placed successfully</p>
  
  <div class="bg-gray-50 p-5 rounded-lg my-5 text-left">
    <h3 class="mb-4 text-amazon-blue font-semibold">Order Summary</h3>
    
    {#each orderData.items as item (item.id)}
      {@const product = products[item.id]}
      {@const itemTotal = product.price * item.quantity}
      
      <div class="flex justify-between py-2 border-b border-gray-200">
        <span>{product.name} (Qty: {item.quantity})</span>
        <span>${itemTotal}</span>
      </div>
    {/each}
    
    <div class="flex justify-between font-bold text-lg text-amazon-red border-t border-gray-300 pt-2 mt-2">
      <span>Total Paid:</span>
      <span>${orderData.total}</span>
    </div>
  </div>
  
  <button 
    class="bg-amazon-blue text-white border-none px-7 py-4 rounded cursor-pointer font-bold mt-5 hover:bg-amazon-blue-light transition-colors"
    on:click={continueShopping}
  >
    Continue Shopping
  </button>
</div>
