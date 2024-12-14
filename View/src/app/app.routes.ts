import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './components/homepage/homepage.component';
import { SearchPageComponent } from './layout/search-page/search-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-reservations', component: MyReservationsComponent } // Fixed path with no spaces
];
