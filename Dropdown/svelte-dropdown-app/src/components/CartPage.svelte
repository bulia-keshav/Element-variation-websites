<script>
  import { onMount } from 'svelte';
  import { cart, currentPage, lastOrder, products } from '../stores.js';
  
  let cartItems = [];
  let total = 0;
  
  onMount(() => {
    cart.subscribe(value => {
      cartItems = value;
      calculateTotal();
    });
  });
  
  function calculateTotal() {
    total = cartItems.reduce((sum, item) => {
      const product = products[item.id];
      return sum + (product.price * item.quantity);
    }, 0);
  }
  
  function removeFromCart(productId) {
    cart.update(currentCart => 
      currentCart.filter(item => item.id !== productId)
    );
  }
  
  function proceedToCheckout() {
    lastOrder.set({
      items: [...cartItems],
      total: total
    });
    
    cart.set([]);
    currentPage.set('success');
  }
</script>

<div>
  <h1 class="text-3xl font-bold text-amazon-blue mb-5">Shopping Cart</h1>
  
  {#if cartItems.length === 0}
    <div class="text-center py-12 text-gray-600">Your cart is empty</div>
  {:else}
    <div>
      {#each cartItems as item (item.id)}
        {@const product = products[item.id]}
        {@const itemTotal = product.price * item.quantity}
        
        <div class="bg-white p-4 my-2.5 rounded-lg flex justify-between items-center shadow">
          <div>
            <h3 class="font-semibold text-amazon-blue">{product.name}</h3>
            <div class="text-gray-600 text-sm">Category: {product.category} | Qty: {item.quantity}</div>
            <div class="text-amazon-orange text-sm">Rating: ★ {product.rating}</div>
          </div>
          <div class="text-right">
            <div class="text-lg font-bold text-amazon-red mb-2">${itemTotal}</div>
            <button 
              on:click={() => removeFromCart(item.id)}
              class="bg-red-600 text-white border-none px-2.5 py-1 rounded cursor-pointer hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      {/each}
      
      <div class="bg-white p-5 rounded-lg mt-5 shadow">
        <h2 class="text-xl font-bold text-amazon-blue mb-4">Order Summary</h2>
        <div class="space-y-2">
          <div class="flex justify-between">Subtotal: <span>${total}</span></div>
          <div class="flex justify-between">Shipping: <span>FREE</span></div>
          <hr class="my-2.5">
          <div class="flex justify-between font-bold text-lg text-amazon-red">Total: <span>${total}</span></div>
        </div>
        <button 
          class="bg-amazon-orange text-black border-none px-7 py-4 rounded cursor-pointer font-bold w-full mt-4 hover:bg-amazon-orange-dark transition-colors"
          on:click={proceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  {/if}
</div>
