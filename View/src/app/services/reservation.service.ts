import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3500/reserv'; 

  constructor() {}

  newReservation(reservationData: { customer_id: number; restaurant_id: number; table_id: number; date: string; time: string }) {
    return fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:"include",
      body: JSON.stringify(reservationData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || 'Error creating reservation');
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error creating reservation:', error);
      throw error;
    });
  }

  viewCustomerReservations(customer_id: number) {
    return fetch(`${this.apiUrl}/customer/${customer_id}`,{
      credentials:"include"
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Error fetching customer reservations');
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching customer reservations:', error);
        throw error;
      });
  }

  viewRestaurantReservations(restaurant_id: number) {
    return fetch(`${this.apiUrl}/vendor/${restaurant_id}`,{
      credentials:"include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Error fetching restaurant reservations');
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching restaurant reservations:', error);
        throw error;
      });
  }

  cancelReservation(id: number) {
    return fetch(`${this.apiUrl}/cancel/${id}`, {
      method: 'DELETE',
      credentials:"include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'Error canceling reservation');
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
        throw error;
      });
  }

  getReservationById(id: number) {
    return fetch(`${this.apiUrl}/${id}`,{
      credentials:"include",

    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Error fetching reservation');
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching reservation:', error);
        throw error;
      });
  }
}
