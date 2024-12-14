import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true, // Standalone component
  imports: [CommonModule], // Include CommonModule to enable *ngFor and *ngIf
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent {
  // Restaurant data
  restaurants = [
    {
      name: 'Pizza Hut',
      image: 'https://storage.googleapis.com/a1aa/image/2ec887c95x1zJablv5YqhJfzLaEZnNpok3vfFfEDNVfVKFSfE.jpg',
      categories: ['Pizza', 'Fast food'],
      location: '123 Main St',
    },
    {
      name: 'McDonald\'s',
      image: 'https://storage.googleapis.com/a1aa/image/0SdA0YkQ6Ba3OFFrH8BQZgVztRli4tPpt2VVV5Gqh5CVKkeJA.jpg',
      categories: ['Burger', 'Fast food'],
      location: '456 Elm St',
    },
    {
      name: 'City Drink',
      image: 'https://storage.googleapis.com/a1aa/image/BzkNEtVpvMbdDdIHAbITQkkfauImotbE3gaR3TSbHl3oUI9JA.jpg',
      categories: ['Drinks', 'Beverages'],
      location: '789 Maple Ave',
    },
    {
      name: 'Sale Sucre',
      image: 'https://storage.googleapis.com/a1aa/image/1Ax0YfOf5FsVuU6dzoNHoQvLA5Wz3elYiXxwccegpSTVlCpPB.jpg',
      categories: ['Desserts', 'Sweets'],
      location: '321 Oak St',
    },
  ];

  // Categories data
  categories = [
    {
      name: 'Pizza',
      image: 'https://storage.googleapis.com/a1aa/image/2ec887c95x1zJablv5YqhJfzLaEZnNpok3vfFfEDNVfVKFSfE.jpg',
      description: 'Explore Restaurant',
    },
    {
      name: 'Burgers',
      image: 'https://storage.googleapis.com/a1aa/image/0SdA0YkQ6Ba3OFFrH8BQZgVztRli4tPpt2VVV5Gqh5CVKkeJA.jpg',
      description: 'Explore Restaurant',
    },
    {
      name: 'Drinks',
      image: 'https://storage.googleapis.com/a1aa/image/BzkNEtVpvMbdDdIHAbITQkkfauImotbE3gaR3TSbHl3oUI9JA.jpg',
      description: 'Explore Restaurant',
    },
    {
      name: 'Desserts and Sweets',
      image: 'https://storage.googleapis.com/a1aa/image/1Ax0YfOf5FsVuU6dzoNHoQvLA5Wz3elYiXxwccegpSTVlCpPB.jpg',
      description: 'Explore Restaurant',
    },
  ];
}
