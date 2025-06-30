<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let isOpen = false;
  
  let openSubmenus = new Set();
  
  function toggleDropdown() {
    isOpen = !isOpen;
    if (!isOpen) {
      openSubmenus.clear();
      openSubmenus = openSubmenus;
    }
  }
  
  function toggleSubmenu(event, menuId) {
    event.stopPropagation();
    
    if (openSubmenus.has(menuId)) {
      openSubmenus.delete(menuId);
    } else {
      // Close siblings at the same level
      const parts = menuId.split('-');
      const level = parts.length;
      const prefix = parts.slice(0, -1).join('-');
      
      // Remove all submenus at the same level or deeper
      for (let submenu of openSubmenus) {
        const submenuParts = submenu.split('-');
        if (submenuParts.length >= level && 
            (level === 1 || submenu.startsWith(prefix + '-'))) {
          openSubmenus.delete(submenu);
        }
      }
      
      openSubmenus.add(menuId);
    }
    openSubmenus = openSubmenus;
  }
  
  function filterProducts(gender, subcategory, brand) {
    dispatch('filter', { gender, subcategory, brand });
    isOpen = false;
    openSubmenus.clear();
    openSubmenus = openSubmenus;
  }
  
  function handleClickOutside(event) {
    if (!event.target.closest('.dropdown-container')) {
      isOpen = false;
      openSubmenus.clear();
      openSubmenus = openSubmenus;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative inline-block my-5 dropdown-container">
  <button 
    class="bg-amazon-blue text-white px-5 py-3 border-none rounded cursor-pointer text-base flex items-center gap-2 hover:bg-amazon-blue-light transition-colors"
    on:click={toggleDropdown}
  >
    <span>All Products</span>
    <span class="dropdown-arrow transition-transform duration-300 {isOpen ? 'dropdown-arrow-rotate' : ''}">▼</span>
  </button>
  
  {#if isOpen}
    <div class="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-lg min-w-[200px] z-50 dropdown-menu">
      <!-- Men -->
      <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50 dropdown-item"
           on:click={(e) => toggleSubmenu(e, 'men')}
           role="button"
           tabindex="0">
        <span>Men</span>
        <span class="text-gray-600">►</span>
        
        {#if openSubmenus.has('men')}
          <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[180px] dropdown-submenu">
            <!-- Men > Shoes -->
            <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
                 on:click={(e) => toggleSubmenu(e, 'men-shoes')}>
              <span>Shoes</span>
              <span class="text-gray-600">►</span>
              
              {#if openSubmenus.has('men-shoes')}
                <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[160px] dropdown-submenu">
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('men', 'shoes', 'nike')}>Nike</div>
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('men', 'shoes', 'adidas')}>Adidas</div>
                </div>
              {/if}
            </div>
            
            <!-- Men > Clothing -->
            <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
                 on:click={(e) => toggleSubmenu(e, 'men-clothing')}>
              <span>Clothing</span>
              <span class="text-gray-600">►</span>
              
              {#if openSubmenus.has('men-clothing')}
                <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[160px] dropdown-submenu">
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('men', 'clothing', 'tshirts')}>T-Shirts</div>
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('men', 'clothing', 'jeans')}>Jeans</div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Women -->
      <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
           on:click={(e) => toggleSubmenu(e, 'women')}>
        <span>Women</span>
        <span class="text-gray-600">►</span>
        
        {#if openSubmenus.has('women')}
          <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[180px] dropdown-submenu">
            <!-- Women > Shoes -->
            <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
                 on:click={(e) => toggleSubmenu(e, 'women-shoes')}>
              <span>Shoes</span>
              <span class="text-gray-600">►</span>
              
              {#if openSubmenus.has('women-shoes')}
                <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[160px] dropdown-submenu">
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('women', 'shoes', 'nike')}>Nike</div>
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('women', 'shoes', 'adidas')}>Adidas</div>
                </div>
              {/if}
            </div>
            
            <!-- Women > Electronics -->
            <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
                 on:click={(e) => toggleSubmenu(e, 'women-electronics')}>
              <span>Electronics</span>
              <span class="text-gray-600">►</span>
              
              {#if openSubmenus.has('women-electronics')}
                <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[160px] dropdown-submenu">
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('women', 'electronics', 'headphones')}>Headphones</div>
                  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('women', 'electronics', 'smartwatch')}>Smartwatch</div>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Home -->
      <div class="px-4 py-3 cursor-pointer border-b border-gray-100 flex justify-between items-center relative hover:bg-gray-50"
           on:click={(e) => toggleSubmenu(e, 'home')}>
        <span>Home</span>
        <span class="text-gray-600">►</span>
        
        {#if openSubmenus.has('home')}
          <div class="absolute left-full top-0 bg-white border border-gray-300 rounded shadow-lg min-w-[180px] dropdown-submenu">
            <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('home', 'garden', 'plants')}>Plants</div>
            <div class="px-4 py-3 cursor-pointer hover:bg-gray-50" on:click={() => filterProducts('home', 'decor', 'candles')}>Candles</div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
