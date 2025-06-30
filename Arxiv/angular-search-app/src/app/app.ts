import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScratchpadComponent } from './scratchpad/scratchpad.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScratchpadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-search-app';
}
