import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./components/signup/signup.component";
import { HomePageComponent } from "./components/homepage/homepage.component";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestaurantCardComponent } from "./components/restaurant-card/restaurant-card.component";
import { SearchPageComponent } from "./layout/search-page/search-page.component";
import { LoginComponent } from "./components/login/login.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MyReservationsComponent } from "./components/my-reservations/my-reservations.component";
import { ReviewsSectionComponent } from './layout/page-two/reviews-section/reviews-section.component';
@Component({
  selector: 'app-root',
  imports: [ReviewsSectionComponent,RouterOutlet, SignupComponent, HomePageComponent, SearchBarComponent, RestaurantCardComponent, SearchPageComponent, LoginComponent, NavBarComponent, MyReservationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{
title = "(WTF) Where's the Food";
}
