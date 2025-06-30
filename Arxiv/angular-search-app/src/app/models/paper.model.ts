export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string | null;
  primary_subject: string;
  cross_listed_subjects: string[];
  submission_date: string;
  announcement_date: string;
  journal_ref: string | null;
  comments: string | null;
  report_number: string | null;
  version: string;
}

export interface SearchTerm {
  term: string;
  field: string;
}

export interface SearchParams {
  searchTerms?: SearchTerm[];
  subjects?: string[];
  crossListed: string;
  dateFilter: string;
  dateType: string;
  specificYear?: string;
  fromDate?: string;
  toDate?: string;
  showAbstracts: string;
  includeOlder: boolean;
  resultsPerPage: number;
}
