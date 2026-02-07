import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Home1 } from './pages/home1/home1';
import { Home2 } from './home2/home2';
import { Home3 } from './home3/home3';
import { Home4 } from './home4/home4';

export const routes: Routes = [
    { path: '', component: Home },        // الصفحة الأساسية
  { path: 'home1', component: Home1 },
  { path: 'home2', component: Home2 },
  { path: 'home3', component: Home3 },
  { path: 'home4', component: Home4 },
];

  
