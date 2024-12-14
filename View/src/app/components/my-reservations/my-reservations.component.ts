import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  reservations: any[] = []; // Declare the reservations as an array
  isModalOpen = false; // Modal state
  selectedReservation: any; // Store the selected reservation for modal

  constructor(private reservationService: ReservationService) {}

  async ngOnInit(): Promise<void> {
    try {
      const customerId = localStorage.getItem('userId');
      if (customerId) {
        const response = await this.reservationService.viewCustomerReservations(Number(customerId));
        this.reservations = response.reservations || []; // Assuming 'reservations' is part of the response
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }

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
