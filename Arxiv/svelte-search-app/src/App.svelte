<script>
  import { 
    searchTerms, 
    subjects, 
    crossListed, 
    dateFilter, 
    specificYear, 
    fromDate, 
    toDate, 
    dateType, 
    showAbstracts, 
    resultsPerPage, 
    includeOlder 
  } from './stores.js';

  // Reactive variables (Svelte will auto-subscribe with $ prefix in template)

  // Subject labels
  const subjectLabels = {
    'cs': 'Computer Science (cs)',
    'physics': 'Physics',
    'econ': 'Economics (econ)',
    'q-bio': 'Quantitative Biology (q-bio)',
    'eess': 'Electrical Engineering and Systems Science (eess)',
    'q-fin': 'Quantitative Finance (q-fin)',
    'math': 'Mathematics (math)',
    'stat': 'Statistics (stat)'
  };

  // Functions
  function addSearchTerm() {
    searchTerms.update(terms => [...terms, { term: '', field: 'title' }]);
  }

  function updateSearchTerm(index, field, value) {
    console.log(`Updating search term ${index}: ${field} = ${value}`);
    searchTerms.update(terms => {
      terms[index][field] = value;
      console.log('Updated searchTerms:', terms);
      return terms;
    });
  }

  function updateSubject(subject, checked) {
    subjects.update(subs => {
      subs[subject] = checked;
      return subs;
    });
  }

  function collectSearchParameters() {
    console.log('Collecting search parameters...');
    console.log('Current searchTerms:', $searchTerms);
    console.log('Current subjects:', $subjects);
    
    const params = new URLSearchParams();
    
    // Collect search terms
    const activeTerms = $searchTerms.filter(term => term.term.trim());
    if (activeTerms.length > 0) {
      params.set('searchTerms', JSON.stringify(activeTerms));
    }
    
    // Collect subject filters
    const activeSubjects = Object.entries($subjects)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);
    if (activeSubjects.length > 0) {
      params.set('subjects', activeSubjects.join(','));
    }
    
    // Other parameters
    params.set('crossListed', $crossListed);
    params.set('dateFilter', $dateFilter);
    params.set('dateType', $dateType);
    params.set('showAbstracts', $showAbstracts);
    params.set('resultsPerPage', $resultsPerPage);
    params.set('includeOlder', $includeOlder);
    
    if ($dateFilter === 'specific' && $specificYear) {
      params.set('specificYear', $specificYear);
    } else if ($dateFilter === 'range') {
      if ($fromDate) params.set('fromDate', $fromDate);
      if ($toDate) params.set('toDate', $toDate);
    }
    
    console.log('Final params:', params.toString());
    return params;
  }

  function performSearch() {
    console.log('performSearch called!');
    const params = collectSearchParameters();
    console.log('Search parameters:', params.toString());
    
    if (params.toString()) {
      console.log('Navigating to results page...');
      window.location.href = `./results.html?${params.toString()}`;
    } else {
      console.log('No search parameters, showing all results');
      window.location.href = `./results.html`;
    }
  }

  function handleSubmit(event) {
    console.log('Form submitted!');
    event.preventDefault();
    performSearch();
  }
</script>

<div class="container">
  <h1>Advanced Search - Svelte</h1>
  
  <form on:submit={handleSubmit}>
    <!-- Search Terms Section -->
    <div class="form-section">
      <div class="form-group">
        <label>Search term(s)</label>
        <div>
          {#each $searchTerms as term, index}
            <div class="search-row">
              <input 
                type="text" 
                class="search-term" 
                placeholder="Search term..." 
                bind:value={term.term}
              >
              <select 
                class="search-field" 
                bind:value={term.field}
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="abstract">Abstract</option>
                <option value="comment">Comment</option>
                <option value="journal">Journal</option>
                <option value="subject">Subject</option>
                <option value="report">Report</option>
                <option value="all">All fields</option>
              </select>
            </div>
          {/each}
        </div>
        <button type="button" class="add-term-btn" on:click={addSearchTerm}>
          Add another term+
        </button>
        <button type="button" class="search-btn" style="margin-left: 10px;" on:click={performSearch}>
          Search
        </button>
      </div>
    </div>

    <!-- Subject Section -->
    <div class="form-section">
      <div class="form-group">
        <label>Subject</label>
        <p style="color: #666; font-size: 14px; margin: 10px 0;">
          All classifications will be included by default
        </p>
        
        <div class="checkbox-group">
          {#each Object.entries($subjects) as [key, value]}
            <div class="checkbox-item">
              <input 
                type="checkbox" 
                id={key} 
                name="subject" 
                value={key}
                checked={value}
                on:change={(e) => updateSubject(key, e.target.checked)}
              >
              <label for={key}>{subjectLabels[key]}</label>
            </div>
          {/each}
        </div>

        <div class="radio-group">
          <div class="radio-item">
            <input 
              type="radio" 
              id="include-cross" 
              name="cross-listed" 
              value="include" 
              bind:group={$crossListed}
            >
            <label for="include-cross">Include cross-listed papers</label>
          </div>
          <div class="radio-item">
            <input 
              type="radio" 
              id="exclude-cross" 
              name="cross-listed" 
              value="exclude" 
              bind:group={$crossListed}
            >
            <label for="exclude-cross">Exclude cross-listed papers</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Section -->
    <div class="form-section">
      <div class="form-group">
        <label>Date</label>
        
        <div class="date-radio-group">
          <div class="radio-item">
            <input 
              type="radio" 
              id="all-dates" 
              name="date-filter" 
              value="all" 
              bind:group={$dateFilter}
            >
            <label for="all-dates">All dates</label>
          </div>
          
          <div class="radio-item">
            <input 
              type="radio" 
              id="past-12" 
              name="date-filter" 
              value="past-12" 
              bind:group={$dateFilter}
            >
            <label for="past-12">Past 12 months</label>
          </div>
          
          <div class="radio-item">
            <input 
              type="radio" 
              id="specific-year" 
              name="date-filter" 
              value="specific" 
              bind:group={$dateFilter}
            >
            <label for="specific-year">Specific year</label>
            <input 
              type="text" 
              placeholder="YYYY" 
              class="date-input" 
              style="width: 100px; margin-left: 10px;" 
              bind:value={$specificYear}
            >
          </div>
          
          <div class="radio-item">
            <input 
              type="radio" 
              id="date-range" 
              name="date-filter" 
              value="range" 
              bind:group={$dateFilter}
            >
            <label for="date-range">Date range</label>
          </div>
        </div>

        <div class="date-inputs date-inputs-margin">
          <span>From</span>
          <input 
            type="text" 
            placeholder="YYYY[-MM[-DD]]" 
            class="date-input" 
            bind:value={$fromDate}
          >
          <span>to</span>
          <input 
            type="text" 
            placeholder="YYYY[-MM[-DD]]" 
            class="date-input" 
            bind:value={$toDate}
          >
        </div>

        <div class="note-text">
          When limiting by date range, the lower bound of the "from" date and the upper bound of the "to" date are used.
          For example, searching with <span class="highlight-text">From: 2012-02</span> and <span class="highlight-text">To: 2013</span> will search for papers submitted from <span class="highlight-text">2012-02-01</span> to <span class="highlight-text">2013-12-31</span>
        </div>

        <div class="radio-group-horizontal">
          <div class="radio-item">
            <input 
              type="radio" 
              id="submission-recent" 
              name="date-type" 
              value="submission-recent" 
              bind:group={$dateType}
            >
            <label for="submission-recent">Submission date (most recent)</label>
          </div>
          <div class="radio-item">
            <input 
              type="radio" 
              id="submission-original" 
              name="date-type" 
              value="submission-original" 
              bind:group={$dateType}
            >
            <label for="submission-original">Submission date (original)</label>
          </div>
          <div class="radio-item">
            <input 
              type="radio" 
              id="announcement" 
              name="date-type" 
              value="announcement" 
              bind:group={$dateType}
            >
            <label for="announcement">Announcement date</label>
          </div>
        </div>

        <div class="note-text">
          You may filter on either submission date or announcement date. Note that announcement date supports only year and month granularity.
        </div>
      </div>
    </div>

    <!-- Display Options Section -->
    <div class="form-section">
      <div class="radio-group">
        <div class="radio-item">
          <input 
            type="radio" 
            id="show-abstracts" 
            name="abstracts" 
            value="show" 
            bind:group={$showAbstracts}
          >
          <label for="show-abstracts">Show abstracts</label>
        </div>
        <div class="radio-item">
          <input 
            type="radio" 
            id="hide-abstracts" 
            name="abstracts" 
            value="hide" 
            bind:group={$showAbstracts}
          >
          <label for="hide-abstracts">Hide abstracts</label>
        </div>
      </div>

      <div class="results-per-page">
        <select class="results-select" bind:value={$resultsPerPage}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </select>
        <span>results per page</span>
        <div class="checkbox-item" style="margin-left: 20px;">
          <input 
            type="checkbox" 
            id="include-older" 
            name="include-older" 
            bind:checked={$includeOlder}
          >
          <label for="include-older">Include older versions of papers</label>
        </div>
      </div>

      <div class="final-search-btn">
        <button type="submit" class="search-btn">Search</button>
      </div>
    </div>
  </form>
</div>
