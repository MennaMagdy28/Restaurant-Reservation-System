import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { RestaurantCardComponent } from "../../components/restaurant-card/restaurant-card.component";
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [SearchBarComponent, RestaurantCardComponent,CommonModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  restaurants: any[] = []; 
  q:string='';
  constructor(private searchService:SearchService,private restaurantService: RestaurantService,private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.q = this.route.snapshot.paramMap.get('id') || '';

    if (!this.q) {
      try {
        this.restaurants = await this.restaurantService.getAll(); 
      } catch (error) {
        console.error('Error loading restaurants:', error);
      }
    } else {
      try {
        this.restaurants = await this.searchService.searchByCategory(this.q); 
        console.log(`q=${this.restaurants}`);
      } catch (error) {
        console.error('Error loading filtered restaurants:', error);
      }
    }
  }
  onSearchResults(results: any[]): void {
    this.restaurants = results;
  }
}
