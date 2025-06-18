import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CommonModule)
  ]
}).catch(err => console.error(err));