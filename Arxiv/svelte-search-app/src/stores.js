import { writable } from 'svelte/store';

export const searchTerms = writable([{ term: '', field: 'title' }]);
export const subjects = writable({
  cs: false,
  physics: false,
  econ: false,
  'q-bio': false,
  eess: false,
  'q-fin': false,
  math: false,
  stat: false
});
export const crossListed = writable('include');
export const dateFilter = writable('all');
export const specificYear = writable('');
export const fromDate = writable('');
export const toDate = writable('');
export const dateType = writable('submission-recent');
export const showAbstracts = writable('show');
export const resultsPerPage = writable('50');
export const includeOlder = writable(false);
