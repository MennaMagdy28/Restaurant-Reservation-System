import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RestaurantCardComponent } from "../../components/restaurant-card/restaurant-card.component";
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SearchBarComponent, RestaurantCardComponent,CommonModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  restaurants: any[] = []; 

  constructor(private restserv: RestaurantService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.restaurants = await this.restserv.getAll(); 
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  }
  onSearchResults(results: any[]): void {
    this.restaurants = results;  // Update the displayed restaurants based on search results
  }
}
