<script>
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import ProductsPage from './components/ProductsPage.svelte';
  import CartPage from './components/CartPage.svelte';
  import SuccessPage from './components/SuccessPage.svelte';
  import Scratchpad from './components/Scratchpad.svelte';
  import { currentPage } from './stores.js';
  
  let page;
  
  onMount(() => {
    currentPage.subscribe(value => {
      page = value;
    });
  });
</script>

<div class="font-sans bg-gray-100 min-h-screen">
  <Header />
  
  <div class="max-w-6xl mx-auto my-5 px-5">
    {#if page === 'products'}
      <ProductsPage />
    {:else if page === 'cart'}
      <CartPage />
    {:else if page === 'success'}
      <SuccessPage />
    {/if}
  </div>
  
  <!-- Floating Scratchpad -->
  <Scratchpad />
</div>
