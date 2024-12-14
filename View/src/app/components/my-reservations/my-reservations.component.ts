import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  reservations: any[] = []; 
  isModalOpen = false; 
  selectedReservation: any;

  constructor(private reservationService: ReservationService,private restaurantService:RestaurantService) {}

  async ngOnInit(): Promise<void> {
    try {
      const customerId = localStorage.getItem('userId');
      if (customerId) {

        const response = await this.reservationService.viewCustomerReservations(Number(customerId));
        
        if (response.reservations) {

          this.reservations = await Promise.all(
            response.reservations.map(async (reservation: any) => {

              const restaurantDetails = await this.restaurantService.getById(reservation.restaurant_id);
              const restData = restaurantDetails.restaurant;

              console.log(restaurantDetails)
              return {
                ...reservation,
                restaurantName: restData.title || 'N/A',
                restaurantLogo: restData.image || 'N/A',
                restaurantAddress: restData.location
                            };
            })
          );
  
          console.log(`Customer ID: ${customerId}, Reservations:`, this.reservations);
        } else {
          this.reservations = [];
          console.warn('No reservations found for this customer.');
        }
      } else {
        console.warn('No customer ID found in localStorage.');
      }
    } catch (error) {
      console.error('Error fetching customer reservations:', error);
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
