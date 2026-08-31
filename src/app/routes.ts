import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', title: 'Marcelo Expedito — Home', component: HomeComponent },
  { path: 'work', title: 'Marcelo Expedito — Trabalhos', component: WorkComponent },
  { path: 'about', title: 'Marcelo Expedito — Sobre', component: AboutComponent },
  { path: 'contact', title: 'Marcelo Expedito — Contato', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];