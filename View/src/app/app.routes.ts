import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomePageComponent } from './components/homepage/homepage.component';
import { SearchPageComponent } from './layout/search-page/search-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MapComponent } from './components/map-page/map-page.component';
import { PageTwoComponent } from './layout/page-two/page-two.component';
import { ReservationComponent } from './components/reservation/reservation.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:id', component: SearchPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-reservations', component: MyReservationsComponent },
  { path:'map',component:MapComponent},
  { path: 'page-two/:id', component: PageTwoComponent },
  { path:'reservation' , component:ReservationComponent}
];
