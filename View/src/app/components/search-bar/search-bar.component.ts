import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery: string = ''; 
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.searchByName(this.searchQuery)
      .then(nameResults => {
        this.searchResults.emit(nameResults.restaurants); 
      })
      .catch(error => {
        console.error('Error searching by name:', error);
      });
  }
  

  onKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
