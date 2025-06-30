import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperDataService } from '../services/paper-data.service';
import { Paper, SearchParams, SearchTerm } from '../models/paper.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  filteredPapers: Paper[] = [];
  searchParams: SearchParams = {
    crossListed: 'include',
    dateFilter: 'all',
    dateType: 'submission-recent',
    showAbstracts: 'show',
    includeOlder: false,
    resultsPerPage: 50
  };
  currentPage = 1;
  showAbstracts = true;
  searchInfo: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paperDataService: PaperDataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parseURLParameters(params);
      this.performSearch();
      this.displaySearchInfo();
    });
  }

  private parseURLParameters(params: any): void {
    this.searchParams = {
      crossListed: params['crossListed'] || 'include',
      dateFilter: params['dateFilter'] || 'all',
      dateType: params['dateType'] || 'submission-recent',
      showAbstracts: params['showAbstracts'] || 'show',
      includeOlder: params['includeOlder'] === 'true',
      resultsPerPage: parseInt(params['resultsPerPage']) || 50
    };

    // Parse search terms
    if (params['searchTerms']) {
      try {
        this.searchParams.searchTerms = JSON.parse(params['searchTerms']);
      } catch (e) {
        console.error('Error parsing search terms:', e);
      }
    }

    // Parse subjects
    if (params['subjects']) {
      this.searchParams.subjects = params['subjects'].split(',');
    }

    // Parse optional date parameters
    if (params['specificYear']) {
      this.searchParams.specificYear = params['specificYear'];
    }
    if (params['fromDate']) {
      this.searchParams.fromDate = params['fromDate'];
    }
    if (params['toDate']) {
      this.searchParams.toDate = params['toDate'];
    }

    this.showAbstracts = this.searchParams.showAbstracts === 'show';
  }

  private performSearch(): void {
    this.filteredPapers = this.paperDataService.searchPapers(this.searchParams);
    this.currentPage = 1;
  }

  private displaySearchInfo(): void {
    this.searchInfo = [];
    
    if (this.searchParams.searchTerms && this.searchParams.searchTerms.length > 0) {
      const terms = this.searchParams.searchTerms.map(t => `"${t.term}" in ${t.field}`).join(', ');
      this.searchInfo.push(`Search terms: ${terms}`);
    }
    
    if (this.searchParams.subjects && this.searchParams.subjects.length > 0) {
      this.searchInfo.push(`Subjects: ${this.searchParams.subjects.join(', ')}`);
    }
    
    if (this.searchParams.dateFilter !== 'all') {
      this.searchInfo.push(`Date filter: ${this.searchParams.dateFilter}`);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPapers.length / this.searchParams.resultsPerPage);
  }

  get paginatedResults(): Paper[] {
    const startIndex = (this.currentPage - 1) * this.searchParams.resultsPerPage;
    const endIndex = Math.min(startIndex + this.searchParams.resultsPerPage, this.filteredPapers.length);
    return this.filteredPapers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo(0, 0);
    }
  }

  getHighlightedText(text: string): string {
    return this.paperDataService.highlightText(text, this.searchParams.searchTerms);
  }

  backToSearch(): void {
    this.router.navigate(['/search']);
  }

  openPaperDetails(paper: Paper): void {
    alert(`Paper details would open here for: ${paper.title}`);
  }
}
