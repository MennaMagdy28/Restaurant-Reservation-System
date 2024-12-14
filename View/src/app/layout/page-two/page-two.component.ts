import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { ReviewsSectionComponent } from './reviews-section/reviews-section.component';

@Component({
    selector: 'app-page-two',
    templateUrl: './page-two.component.html',
    // standalone: false,
  styleUrls: ['./page-two.component.css'],
  imports:[ReviewsSectionComponent,ButtonComponent]
})
export class PageTwoComponent {

}