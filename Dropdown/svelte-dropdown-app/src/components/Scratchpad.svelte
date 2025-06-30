<script>
  import { writable } from 'svelte/store';
  
  // Create a store for the scratchpad notes
  const notes = writable(localStorage.getItem('scratchpad-notes') || '');
  let isMinimized = false;
  let notesValue = '';
  
  // Subscribe to notes changes and save to localStorage
  notes.subscribe(value => {
    notesValue = value;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('scratchpad-notes', value);
    }
  });
  
  function toggleMinimize() {
    isMinimized = !isMinimized;
  }
  
  function updateNotes(event) {
    notes.set(event.target.value);
  }
</script>

<!-- Floating Scratchpad -->
<div class="fixed bottom-4 right-4 z-50 scratchpad-container">
  <div class="bg-white border border-gray-300 rounded-lg shadow-lg {isMinimized ? 'w-12 h-12' : 'w-80 h-64'}">
    <!-- Header -->
    <div class="flex justify-between items-center p-3 bg-amazon-blue text-white rounded-t-lg cursor-pointer" on:click={toggleMinimize}>
      <span class="text-sm font-medium {isMinimized ? 'hidden' : ''}">📝 Scratchpad</span>
      <span class="text-xs {isMinimized ? 'mx-auto' : ''}">{isMinimized ? '📝' : '−'}</span>
    </div>
    
    <!-- Content -->
    {#if !isMinimized}
      <div class="p-3">
        <textarea
          class="w-full h-40 p-2 text-sm border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-amazon-blue focus:border-transparent"
          placeholder="Your quick notes here..."
          value={notesValue}
          on:input={updateNotes}
        ></textarea>
      </div>
    {/if}
  </div>
</div>

<style>
  .scratchpad-container {
    transition: all 0.3s ease;
  }
  
  .scratchpad-container:hover {
    transform: translateY(-2px);
  }
</style>
