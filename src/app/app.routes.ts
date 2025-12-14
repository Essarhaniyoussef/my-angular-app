import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products';
import { Auth } from './pages/auth/auth';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
        { path: '', component: HomeComponent }, 
        { path: 'auth', component: Auth },  
        { path: 'products', component: ProductsComponent },
];
