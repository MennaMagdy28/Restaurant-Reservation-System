import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private baseUrl = 'http://localhost:3500/search'; 

  searchByCategory(q: string): Promise<any> {
    return fetch(`${this.baseUrl}/category/${q}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants by category');
        }
        return response.json();
      })
      .catch(error => {
        throw new Error(error.message);
      });
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
