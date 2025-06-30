import { Injectable } from '@angular/core';
import { Paper, SearchParams, SearchTerm } from '../models/paper.model';

@Injectable({
  providedIn: 'root'
})
export class PaperDataService {
  private papersData: Paper[] = [
    {
      "id": "2506.12345",
      "title": "Advances in Graph Neural Networks for Temporal Data Analysis",
      "authors": ["Alice Zhang", "Bob Chen"],
      "abstract": "This paper explores novel graph neural network architectures for processing temporal data, focusing on dynamic graph structures in real-time applications. We propose a new attention mechanism to improve performance in time-series forecasting.",
      "primary_subject": "cs.LG",
      "cross_listed_subjects": ["cs.AI", "stat.ML"],
      "submission_date": "2025-06-26",
      "announcement_date": "2025-06-27",
      "journal_ref": null,
      "comments": "Accepted at NeurIPS 2025",
      "report_number": null,
      "version": "v1"
    },
    {
      "id": "2506.12353",
      "title": "Neural Network Compression for Mobile Applications",
      "authors": ["Alice Zhang"],
      "abstract": "We present a method for compressing neural networks to enable efficient deployment on mobile devices, using knowledge distillation and pruning.",
      "primary_subject": "cs.LG",
      "cross_listed_subjects": ["cs.CV"],
      "submission_date": "2025-06-24",
      "announcement_date": "2025-06-25",
      "journal_ref": null,
      "comments": "8 pages, submitted to ICML 2025",
      "report_number": "TR-2025-002",
      "version": "v1"
    },
    {
      "id": "2506.12354",
      "title": "Older Neural Network Study",
      "authors": ["Alice Zhang", "Clara Kim"],
      "abstract": "An early study on convolutional neural networks for image classification, exploring transfer learning techniques.",
      "primary_subject": "cs.CV",
      "cross_listed_subjects": ["cs.LG"],
      "submission_date": "2025-06-10",
      "announcement_date": "2025-06-11",
      "journal_ref": null,
      "comments": null,
      "report_number": null,
      "version": "v2"
    },
    {
      "id": "2506.12346",
      "title": "Efficient Convolutional Neural Networks for Edge Devices",
      "authors": ["Clara Kim"],
      "abstract": "We present a lightweight CNN model optimized for edge devices, achieving high accuracy with minimal computational overhead.",
      "primary_subject": "cs.LG",
      "cross_listed_subjects": ["eess.SP"],
      "submission_date": "2025-06-25",
      "announcement_date": "2025-06-26",
      "journal_ref": "Journal of Embedded Systems, 2025",
      "comments": null,
      "report_number": "TR-2025-001",
      "version": "v1"
    },
    {
      "id": "2506.12350",
      "title": "Neural Network-Based Image Segmentation",
      "authors": ["Ivy Tran"],
      "abstract": null,
      "primary_subject": "cs.CV",
      "cross_listed_subjects": ["cs.LG"],
      "submission_date": "2025-06-21",
      "announcement_date": "2025-06-22",
      "journal_ref": null,
      "comments": "Preliminary work, abstract forthcoming",
      "report_number": null,
      "version": "v1"
    }
  ];

  getAllPapers(): Paper[] {
    return this.papersData;
  }

  searchPapers(searchParams: SearchParams): Paper[] {
    return this.papersData.filter(paper => {
      // Search terms filter
      if (searchParams.searchTerms && searchParams.searchTerms.length > 0) {
        const matchesAnyTerm = searchParams.searchTerms.some(termObj => 
          this.matchesSearchTerm(paper, termObj));
        if (!matchesAnyTerm) return false;
      }
      
      // Subject filter
      if (!this.matchesSubjectFilter(paper, searchParams)) return false;
      
      // Date filter
      if (!this.matchesDateFilter(paper, searchParams)) return false;
      
      // Version filter
      if (!searchParams.includeOlder && paper.version !== 'v1') {
        return false;
      }
      
      return true;
    });
  }

  private matchesSearchTerm(paper: Paper, termObj: SearchTerm): boolean {
    const term = termObj.term.toLowerCase();
    const field = termObj.field;
    
    switch (field) {
      case 'title':
        return !!paper.title && paper.title.toLowerCase().includes(term);
      case 'author':
        return paper.authors.some(author => 
          author.toLowerCase().includes(term));
      case 'abstract':
        return !!paper.abstract && paper.abstract.toLowerCase().includes(term);
      case 'comment':
        return !!paper.comments && paper.comments.toLowerCase().includes(term);
      case 'journal':
        return !!paper.journal_ref && paper.journal_ref.toLowerCase().includes(term);
      case 'subject':
        return paper.primary_subject.toLowerCase().includes(term) ||
               paper.cross_listed_subjects.some(subj => 
                 subj.toLowerCase().includes(term));
      case 'report':
        return !!paper.report_number && paper.report_number.toLowerCase().includes(term);
      case 'all':
      default:
        return paper.title.toLowerCase().includes(term) ||
               paper.authors.some(author => 
                 author.toLowerCase().includes(term)) ||
               (!!paper.abstract && paper.abstract.toLowerCase().includes(term)) ||
               (!!paper.comments && paper.comments.toLowerCase().includes(term)) ||
               (!!paper.journal_ref && paper.journal_ref.toLowerCase().includes(term)) ||
               paper.primary_subject.toLowerCase().includes(term) ||
               paper.cross_listed_subjects.some(subj => 
                 subj.toLowerCase().includes(term)) ||
               (!!paper.report_number && paper.report_number.toLowerCase().includes(term));
    }
  }

  private matchesSubjectFilter(paper: Paper, searchParams: SearchParams): boolean {
    if (!searchParams.subjects || searchParams.subjects.length === 0) {
      return true; // No subject filter
    }
    
    const paperSubjects = [paper.primary_subject];
    if (searchParams.crossListed === 'include' && paper.cross_listed_subjects) {
      paperSubjects.push(...paper.cross_listed_subjects);
    }
    
    return searchParams.subjects.some(filterSubject => {
      return paperSubjects.some(paperSubject => {
        if (filterSubject === 'cs') return paperSubject.startsWith('cs.');
        if (filterSubject === 'physics') return paperSubject.startsWith('physics') || paperSubject.includes('phys');
        if (filterSubject === 'math') return paperSubject.startsWith('math');
        if (filterSubject === 'stat') return paperSubject.startsWith('stat');
        if (filterSubject === 'econ') return paperSubject.startsWith('econ');
        if (filterSubject === 'q-bio') return paperSubject.startsWith('q-bio');
        if (filterSubject === 'q-fin') return paperSubject.startsWith('q-fin');
        if (filterSubject === 'eess') return paperSubject.startsWith('eess');
        return paperSubject.includes(filterSubject);
      });
    });
  }

  private matchesDateFilter(paper: Paper, searchParams: SearchParams): boolean {
    const dateField = searchParams.dateType === 'announcement' ? 'announcement_date' : 'submission_date';
    const paperDate = new Date(paper[dateField]);
    const currentDate = new Date('2025-06-27'); // Current date from context
    
    switch (searchParams.dateFilter) {
      case 'all':
        return true;
      case 'past-12':
        const twelveMonthsAgo = new Date(currentDate);
        twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
        return paperDate >= twelveMonthsAgo;
      case 'specific':
        if (searchParams.specificYear) {
          return paperDate.getFullYear() === parseInt(searchParams.specificYear);
        }
        return true;
      case 'range':
        let fromDate = null, toDate = null;
        
        if (searchParams.fromDate) {
          fromDate = new Date(searchParams.fromDate + (searchParams.fromDate.length === 4 ? '-01-01' : 
                             searchParams.fromDate.length === 7 ? '-01' : ''));
        }
        if (searchParams.toDate) {
          const toDateStr = searchParams.toDate;
          if (toDateStr.length === 4) {
            toDate = new Date(toDateStr + '-12-31');
          } else if (toDateStr.length === 7) {
            const [year, month] = toDateStr.split('-');
            toDate = new Date(parseInt(year), parseInt(month), 0); // Last day of month
          } else {
            toDate = new Date(toDateStr);
          }
        }
        
        if (fromDate && paperDate < fromDate) return false;
        if (toDate && paperDate > toDate) return false;
        return true;
      default:
        return true;
    }
  }

  highlightText(text: string, searchTerms?: SearchTerm[]): string {
    if (!searchTerms || !text) return text;
    
    let highlightedText = text;
    searchTerms.forEach(termObj => {
      const regex = new RegExp(`(${termObj.term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="highlight">$1</span>');
    });
    return highlightedText;
  }
}
