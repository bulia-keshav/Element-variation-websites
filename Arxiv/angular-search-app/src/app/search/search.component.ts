import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchParams, SearchTerm } from '../models/paper.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm: FormGroup;

  subjects = [
    { value: 'cs', label: 'Computer Science (cs)' },
    { value: 'physics', label: 'Physics' },
    { value: 'econ', label: 'Economics (econ)' },
    { value: 'q-bio', label: 'Quantitative Biology (q-bio)' },
    { value: 'eess', label: 'Electrical Engineering and Systems Science (eess)' },
    { value: 'q-fin', label: 'Quantitative Finance (q-fin)' },
    { value: 'math', label: 'Mathematics (math)' },
    { value: 'stat', label: 'Statistics (stat)' }
  ];

  searchFields = [
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'comment', label: 'Comment' },
    { value: 'journal', label: 'Journal' },
    { value: 'subject', label: 'Subject' },
    { value: 'report', label: 'Report' },
    { value: 'all', label: 'All fields' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerms: this.fb.array([this.createSearchTermGroup()]),
      subjects: this.fb.array([]),
      crossListed: ['include'],
      dateFilter: ['all'],
      specificYear: [''],
      fromDate: [''],
      toDate: [''],
      dateType: ['submission-recent'],
      showAbstracts: ['show'],
      resultsPerPage: [50],
      includeOlder: [false]
    });
  }

  get searchTermsArray(): FormArray {
    return this.searchForm.get('searchTerms') as FormArray;
  }

  get subjectsArray(): FormArray {
    return this.searchForm.get('subjects') as FormArray;
  }

  createSearchTermGroup(): FormGroup {
    return this.fb.group({
      term: [''],
      field: ['all']
    });
  }

  addSearchTerm(): void {
    this.searchTermsArray.push(this.createSearchTermGroup());
  }

  removeSearchTerm(index: number): void {
    if (this.searchTermsArray.length > 1) {
      this.searchTermsArray.removeAt(index);
    }
  }

  onSubjectChange(subjectValue: string, isChecked: boolean): void {
    const subjectsArray = this.subjectsArray;
    
    if (isChecked) {
      subjectsArray.push(this.fb.control(subjectValue));
    } else {
      const index = subjectsArray.controls.findIndex(control => control.value === subjectValue);
      if (index !== -1) {
        subjectsArray.removeAt(index);
      }
    }
  }

  isSubjectSelected(subjectValue: string): boolean {
    return this.subjectsArray.controls.some(control => control.value === subjectValue);
  }

  onSearch(): void {
    const formValue = this.searchForm.value;
    
    // Collect search terms
    const searchTerms: SearchTerm[] = formValue.searchTerms
      .filter((term: any) => term.term.trim())
      .map((term: any) => ({ term: term.term.trim(), field: term.field }));

    // Collect subjects
    const subjects: string[] = formValue.subjects || [];

    // Build search parameters
    const searchParams: SearchParams = {
      searchTerms: searchTerms.length > 0 ? searchTerms : undefined,
      subjects: subjects.length > 0 ? subjects : undefined,
      crossListed: formValue.crossListed,
      dateFilter: formValue.dateFilter,
      dateType: formValue.dateType,
      specificYear: formValue.specificYear || undefined,
      fromDate: formValue.fromDate || undefined,
      toDate: formValue.toDate || undefined,
      showAbstracts: formValue.showAbstracts,
      includeOlder: formValue.includeOlder,
      resultsPerPage: formValue.resultsPerPage
    };

    // Convert to URL parameters and navigate
    const queryParams: any = {};
    
    if (searchParams.searchTerms) {
      queryParams.searchTerms = JSON.stringify(searchParams.searchTerms);
    }
    if (searchParams.subjects) {
      queryParams.subjects = searchParams.subjects.join(',');
    }
    
    queryParams.crossListed = searchParams.crossListed;
    queryParams.dateFilter = searchParams.dateFilter;
    queryParams.dateType = searchParams.dateType;
    queryParams.showAbstracts = searchParams.showAbstracts;
    queryParams.resultsPerPage = searchParams.resultsPerPage;
    queryParams.includeOlder = searchParams.includeOlder;
    
    if (searchParams.specificYear) queryParams.specificYear = searchParams.specificYear;
    if (searchParams.fromDate) queryParams.fromDate = searchParams.fromDate;
    if (searchParams.toDate) queryParams.toDate = searchParams.toDate;

    this.router.navigate(['/results'], { queryParams });
  }
}
