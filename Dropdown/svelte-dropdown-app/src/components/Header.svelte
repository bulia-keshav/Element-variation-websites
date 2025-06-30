<script>
  import { cart, currentPage } from '../stores.js';
  
  let cartCount = 0;
  let currentPageValue = 'products';
  
  cart.subscribe(value => {
    cartCount = value.reduce((sum, item) => sum + item.quantity, 0);
  });
  
  currentPage.subscribe(value => {
    currentPageValue = value;
  });
  
  function showProducts() {
    currentPage.set('products');
  }
  
  function showCart() {
    currentPage.set('cart');
  }
</script>

<div class="bg-amazon-blue text-white px-5 py-2.5 flex justify-between items-center">
  <div class="text-2xl font-bold">SimpleZon</div>
  <div class="flex gap-5">
    <button 
      on:click={showProducts} 
      class="text-white no-underline px-3 py-2 rounded hover:bg-amazon-blue-light transition-colors {currentPageValue === 'products' ? 'bg-amazon-blue-light' : ''}"
    >
      Products
    </button>
    <button 
      on:click={showCart} 
      class="text-white no-underline px-3 py-2 rounded hover:bg-amazon-blue-light transition-colors {currentPageValue === 'cart' ? 'bg-amazon-blue-light' : ''}"
    >
      Cart 
      <span class="bg-amazon-orange text-black rounded-full px-1.5 py-0.5 text-xs ml-1">{cartCount}</span>
    </button>
  </div>
</div>
