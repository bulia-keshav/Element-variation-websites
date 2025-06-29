import './app.css'
import SearchResults from './SearchResults.svelte'

const app = new SearchResults({
  target: document.getElementById('app'),
})

export default app
