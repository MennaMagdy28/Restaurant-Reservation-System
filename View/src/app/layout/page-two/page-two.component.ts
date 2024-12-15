import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ReviewsSectionComponent } from './reviews-section/reviews-section.component';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
    selector: 'app-page-two',
    templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.css'],
  imports:[ReviewsSectionComponent,ButtonComponent]
})
export class PageTwoComponent {
  id!: number;
  restaurant: any;
  constructor(private route: ActivatedRoute,private restaurantService:RestaurantService) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getById(this.id).then((data) => {
      this.restaurant = data.restaurant;
      console.log('Restaurant Details:', this.restaurant);
    });
    // fetchRestaurantDetails(this.id);
  }
  fetchRestaurantDetails(id: number) {

  }
}