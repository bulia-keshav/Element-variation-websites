<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Reactive stores for search results
  const searchParams = writable({});
  const results = writable([]);
  const loading = writable(false);
  const totalResults = writable(0);
  const currentPage = writable(1);
  const showAbstracts = writable(true);

  // Mock data for demonstration - copied from Data.html
  const mockResults = [
    {
      id: "2506.12345",
      title: "Advances in Graph Neural Networks for Temporal Data Analysis",
      authors: ["Alice Zhang", "Bob Chen"],
      abstract: "This paper explores novel graph neural network architectures for processing temporal data, focusing on dynamic graph structures in real-time applications. We propose a new attention mechanism to improve performance in time-series forecasting.",
      subjects: ["cs.LG", "cs.AI", "stat.ML"],
      primary_subject: "cs.LG",
      cross_listed_subjects: ["cs.AI", "stat.ML"],
      date: "2025-06-26",
      submission_date: "2025-06-26",
      announcement_date: "2025-06-27",
      journal: null,
      journal_ref: null,
      comments: "Accepted at NeurIPS 2025",
      report_number: null,
      version: "v1"
    },
    {
      id: "2506.12353",
      title: "Neural Network Compression for Mobile Applications",
      authors: ["Alice Zhang"],
      abstract: "We present a method for compressing neural networks to enable efficient deployment on mobile devices, using knowledge distillation and pruning.",
      subjects: ["cs.LG", "cs.CV"],
      primary_subject: "cs.LG",
      cross_listed_subjects: ["cs.CV"],
      date: "2025-06-24",
      submission_date: "2025-06-24",
      announcement_date: "2025-06-25",
      journal: null,
      journal_ref: null,
      comments: "8 pages, submitted to ICML 2025",
      report_number: "TR-2025-002",
      version: "v1"
    },
    {
      id: "2506.12354",
      title: "Older Neural Network Study",
      authors: ["Alice Zhang", "Clara Kim"],
      abstract: "An early study on convolutional neural networks for image classification, exploring transfer learning techniques.",
      subjects: ["cs.CV", "cs.LG"],
      primary_subject: "cs.CV",
      cross_listed_subjects: ["cs.LG"],
      date: "2025-06-10",
      submission_date: "2025-06-10",
      announcement_date: "2025-06-11",
      journal: null,
      journal_ref: null,
      comments: null,
      report_number: null,
      version: "v2"
    },
    {
      id: "2506.12346",
      title: "Efficient Convolutional Neural Networks for Edge Devices",
      authors: ["Clara Kim"],
      abstract: "We present a lightweight CNN model optimized for edge devices, achieving high accuracy with minimal computational overhead.",
      subjects: ["cs.LG", "eess.SP"],
      primary_subject: "cs.LG",
      cross_listed_subjects: ["eess.SP"],
      date: "2025-06-25",
      submission_date: "2025-06-25",
      announcement_date: "2025-06-26",
      journal: "Journal of Embedded Systems, 2025",
      journal_ref: "Journal of Embedded Systems, 2025",
      comments: null,
      report_number: "TR-2025-001",
      version: "v1"
    },
    {
      id: "2506.12350",
      title: "Neural Network-Based Image Segmentation",
      authors: ["Ivy Tran"],
      abstract: null,
      subjects: ["cs.CV", "cs.LG"],
      primary_subject: "cs.CV",
      cross_listed_subjects: ["cs.LG"],
      date: "2025-06-21",
      submission_date: "2025-06-21",
      announcement_date: "2025-06-22",
      journal: null,
      journal_ref: null,
      comments: "Preliminary work, abstract forthcoming",
      report_number: null,
      version: "v1"
    }
  ];

  // Parse URL parameters on mount
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    
    for (const [key, value] of urlParams) {
      if (key === 'searchTerms') {
        try {
          params[key] = JSON.parse(value);
        } catch {
          params[key] = value;
        }
      } else if (key === 'subjects') {
        params[key] = value.split(',');
      } else {
        params[key] = value;
      }
    }
    
    searchParams.set(params);
    showAbstracts.set(params.showAbstracts !== 'hide');
    
    // Simulate loading and filtering results
    loading.set(true);
    setTimeout(() => {
      const filteredResults = filterResults(mockResults, params);
      results.set(filteredResults);
      totalResults.set(filteredResults.length);
      loading.set(false);
    }, 500);
  });

  function filterResults(allResults, params) {
    console.log('Filtering results with params:', params);
    console.log('All results:', allResults.length);
    
    let filtered = [...allResults];
    
    // Filter by search terms
    if (params.searchTerms && params.searchTerms.length > 0) {
      console.log('Filtering by search terms:', params.searchTerms);
      
      filtered = filtered.filter(result => {
        return params.searchTerms.some(searchTerm => {
          const term = searchTerm.term.toLowerCase();
          const field = searchTerm.field;
          
          console.log(`Checking "${term}" in field "${field}" for paper: ${result.title}`);
          
          if (field === 'title') {
            const match = result.title.toLowerCase().includes(term);
            console.log(`Title match: ${match}`);
            return match;
          } else if (field === 'author') {
            const match = result.authors.some(author => author.toLowerCase().includes(term));
            console.log(`Author match: ${match}`);
            return match;
          } else if (field === 'abstract') {
            const match = result.abstract && result.abstract.toLowerCase().includes(term);
            console.log(`Abstract match: ${match}`);
            return match;
          } else if (field === 'comment') {
            const match = result.comments && result.comments.toLowerCase().includes(term);
            console.log(`Comment match: ${match}`);
            return match;
          } else if (field === 'journal') {
            const match = result.journal_ref && result.journal_ref.toLowerCase().includes(term);
            console.log(`Journal match: ${match}`);
            return match;
          } else if (field === 'subject') {
            const match = result.primary_subject.toLowerCase().includes(term) ||
                   result.cross_listed_subjects.some(subject => subject.toLowerCase().includes(term));
            console.log(`Subject match: ${match}`);
            return match;
          } else if (field === 'report') {
            const match = result.report_number && result.report_number.toLowerCase().includes(term);
            console.log(`Report match: ${match}`);
            return match;
          } else if (field === 'all') {
            const match = result.title.toLowerCase().includes(term) ||
                   result.authors.some(author => author.toLowerCase().includes(term)) ||
                   (result.abstract && result.abstract.toLowerCase().includes(term)) ||
                   (result.comments && result.comments.toLowerCase().includes(term)) ||
                   (result.journal_ref && result.journal_ref.toLowerCase().includes(term)) ||
                   result.primary_subject.toLowerCase().includes(term) ||
                   result.cross_listed_subjects.some(subject => subject.toLowerCase().includes(term));
            console.log(`All fields match: ${match}`);
            return match;
          }
          return true;
        });
      });
      
      console.log('After search terms filter:', filtered.length);
    }
    
    // Filter by subjects
    if (params.subjects && params.subjects.length > 0) {
      console.log('Filtering by subjects:', params.subjects);
      
      filtered = filtered.filter(result => {
        const match = params.subjects.some(subject => {
          return result.primary_subject.startsWith(subject) ||
                 result.cross_listed_subjects.some(resultSubject => 
                   resultSubject.startsWith(subject)
                 );
        });
        console.log(`Subject filter for ${result.title}: ${match}`);
        return match;
      });
      
      console.log('After subject filter:', filtered.length);
    }
    
    // Filter by version (includeOlder setting)
    if (params.includeOlder === 'false' || params.includeOlder === false) {
      console.log('Filtering out older versions');
      filtered = filtered.filter(result => result.version === 'v1');
      console.log('After version filter:', filtered.length);
    }
    
    console.log('Final filtered results:', filtered.length);
    return filtered;
  }

  function goBack() {
    if (window.history.length > 1) {
      history.back();
    } else {
      window.location.href = './index.html'; // fallback to main search
    }
  }

  function formatAuthors(authors) {
    if (authors.length <= 2) {
      return authors.join(', ');
    }
    return `${authors[0]}, ${authors[1]}, et al.`;
  }
</script>

<div class="container">
  <div class="header">
    <h1>Search Results</h1>
    <button class="back-btn" on:click={goBack}>
      ← Back to Search
    </button>
  </div>

  {#if $loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Searching...</p>
    </div>
  {:else}
    <div class="results-info">
      <p>Found {$totalResults} results</p>
      {#if Object.keys($searchParams).length > 0}
        <div class="search-summary">
          <h3>Search Parameters:</h3>
          <ul>
            {#if $searchParams.searchTerms}
              <li><strong>Search Terms:</strong> 
                {#each $searchParams.searchTerms as term}
                  "{term.term}" in {term.field}{#if term !== $searchParams.searchTerms[$searchParams.searchTerms.length - 1]}, {/if}
                {/each}
              </li>
            {/if}
            {#if $searchParams.subjects}
              <li><strong>Subjects:</strong> {$searchParams.subjects.join(', ')}</li>
            {/if}
            {#if $searchParams.dateFilter && $searchParams.dateFilter !== 'all'}
              <li><strong>Date Filter:</strong> {$searchParams.dateFilter}</li>
            {/if}
          </ul>
        </div>
      {/if}
    </div>

    <div class="results-list">
      {#each $results as result}
        <div class="result-item">
          <div class="result-header">
            <h2 class="result-title">{result.title}</h2>
            <span class="result-id">arXiv:{result.id}</span>
          </div>
          
          <div class="result-authors">
            <strong>Authors:</strong> {formatAuthors(result.authors)}
          </div>
          
          <div class="result-meta">
            <span class="result-date">Submitted: {result.submission_date}</span>
            {#if result.announcement_date}
              <span class="result-announcement">Announced: {result.announcement_date}</span>
            {/if}
            {#if result.journal_ref}
              <span class="result-journal">Journal: {result.journal_ref}</span>
            {/if}
            <span class="result-subjects">Primary: {result.primary_subject}</span>
            {#if result.cross_listed_subjects && result.cross_listed_subjects.length > 0}
              <span class="result-cross-listed">Cross-listed: {result.cross_listed_subjects.join(', ')}</span>
            {/if}
            <span class="result-version">Version: {result.version}</span>
          </div>
          
          {#if $showAbstracts}
            <div class="result-abstract">
              <strong>Abstract:</strong> {result.abstract}
            </div>
          {/if}
          
          {#if result.comments}
            <div class="result-comments">
              <strong>Comments:</strong> {result.comments}
            </div>
          {/if}
          
          {#if result.report_number}
            <div class="result-report">
              <strong>Report:</strong> {result.report_number}
            </div>
          {/if}
          
          <div class="result-actions">
            <a href="#" class="action-link">PDF</a>
            <a href="#" class="action-link">Other formats</a>
            <a href="#" class="action-link">References & Citations</a>
          </div>
        </div>
      {/each}
      
      {#if $results.length === 0}
        <div class="no-results">
          <h3>No results found</h3>
          <p>Try adjusting your search criteria or removing some filters.</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    min-height: 90vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #eee;
  }

  h1 {
    font-size: 28px;
    color: #333;
    margin: 0;
  }

  .back-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
  }

  .back-btn:hover {
    background: #5a6268;
  }

  .loading {
    text-align: center;
    padding: 50px;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .results-info {
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 5px;
  }

  .search-summary {
    margin-top: 15px;
  }

  .search-summary h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  .search-summary ul {
    margin: 0;
    padding-left: 20px;
  }

  .search-summary li {
    margin-bottom: 5px;
  }

  .results-list {
    space-y: 20px;
  }

  .result-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    background: white;
  }

  .result-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .result-title {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
    margin: 0;
    flex: 1;
    margin-right: 15px;
  }

  .result-id {
    font-size: 14px;
    color: #666;
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .result-authors {
    margin-bottom: 10px;
    color: #555;
  }

  .result-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }

  .result-abstract {
    margin-bottom: 15px;
    line-height: 1.5;
    color: #444;
  }

  .result-comments {
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }

  .result-actions {
    display: flex;
    gap: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }

  .action-link {
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
  }

  .action-link:hover {
    text-decoration: underline;
  }

  .no-results {
    text-align: center;
    padding: 50px;
    color: #666;
  }

  .no-results h3 {
    margin-bottom: 10px;
  }
</style>
