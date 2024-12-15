import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private baseUrl = 'http://localhost:3500/search'; 

  async searchByCategory(q: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/category/${q}`); // Await the fetch call
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants by category');
    }
    const data = await response.json(); // Await the JSON parsing
    return data.restaurants; // Return the restaurants array
  }
  
  searchByName(q: string): Promise<any> {
    return fetch(`${this.baseUrl}/name/${q}`)
      .then(response => {
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants by name');
        }
        return response.json();
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }
}
