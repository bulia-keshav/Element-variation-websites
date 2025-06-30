import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scratchpad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})
export class ScratchpadComponent implements OnInit {
  isMinimized = false;
  isHidden = false;
  notes = '';
  
  ngOnInit(): void {
    this.loadNotes();
  }

  toggleScratchpad(): void {
    this.isMinimized = !this.isMinimized;
  }

  clearNotes(): void {
    if (confirm('Clear all notes?')) {
      this.notes = '';
      this.saveNotes();
    }
  }

  hideScratchpad(): void {
    this.isHidden = true;
  }

  showScratchpad(): void {
    this.isHidden = false;
  }

  onNotesChange(): void {
    this.saveNotes();
  }

  private saveNotes(): void {
    localStorage.setItem('scratchpadContent', this.notes);
  }

  private loadNotes(): void {
    const savedNotes = localStorage.getItem('scratchpadContent');
    if (savedNotes) {
      this.notes = savedNotes;
    }
  }

  get characterCount(): number {
    return this.notes.length;
  }
}
