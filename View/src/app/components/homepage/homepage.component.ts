import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true, // Standalone component
  imports: [CommonModule], // Include CommonModule to enable *ngFor and *ngIf
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private restaurantServices:RestaurantService,
    private router: Router
  ){

  }
  restaurants:any = [];
  categories:any = [];
  ngOnInit(){
    this.restaurantServices.getAll().then((data) => {
      this.restaurants = data;
      console.log('Restaurant Details:', this.restaurants);
    });
    this.restaurantServices.getCategories().then((data) => {
      this.categories = data;
      console.log('Restaurant Details:', this.categories);
    });
  }
  navigateToRestaurant(id: number) {
    this.router.navigate([`/page-two/${id}`]);
  }
  navigateToSearch(q: string) {
    this.router.navigate([`/search/${q}`]);
  }
}
