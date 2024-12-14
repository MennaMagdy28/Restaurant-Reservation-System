import { Component } from '@angular/core';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent {
  // Sample reservation data
  reservations = [
    {
      orderId: '1874368775',
      restaurantName: 'City Crepe - Awlad Amer',
      restaurantLogo: 'https://storage.googleapis.com/a1aa/image/ro4IR3uXvnaQDxeUhwzxJhaCN3SQ6aEP32RToqb6Jgshpx8JA.jpg',
      date: '05 December 2024',
      time: '12:03',
      status: 'Delivered',
      name: 'John Doe',
      email: 'john.doe@example.com',
      tables: 2
    },
    {
      orderId: '1878161393',
      restaurantName: 'City Crepe - Awlad Amer',
      restaurantLogo: 'https://storage.googleapis.com/a1aa/image/ro4IR3uXvnaQDxeUhwzxJhaCN3SQ6aEP32RToqb6Jgshpx8JA.jpg',
      date: '03 December 2024',
      time: '15:14',
      status: 'Delivered',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      tables: 3
    },
    // Add more reservations here
  ];

  // Modal state
  isModalOpen = false;
  selectedReservation: any;

  // Open the modal with the selected reservation details
  openDetails(reservation: any) {
    this.selectedReservation = reservation;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }
}
