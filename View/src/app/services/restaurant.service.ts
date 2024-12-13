import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:3500/restaurant';

  constructor() {}

  async getAll(): Promise<any> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data = await response.json();
    return data.restaurants;
  }

  async getById(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurant with ID ${id}`);
    }
    return response.json();
  }

  async create(restaurantData: any): Promise<any> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(restaurantData)
    });
    if (!response.ok) {
      throw new Error('Failed to create restaurant');
    }
    return response.json();
  }

  async update(id: number, restaurantData: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(restaurantData)
    });
    if (!response.ok) {
      throw new Error(`Failed to update restaurant with ID ${id}`);
    }
    return response.json();
  }

  async delete(id: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Failed to delete restaurant with ID ${id}`);
    }
    return response.json();
  }

  async getCategories(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.categories;
  }
}
