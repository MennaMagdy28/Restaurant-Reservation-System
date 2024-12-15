import { NgClass, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-reservation',
  imports:[FormsModule,NgFor,NgClass],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit, OnDestroy {
  seatLayout: any[][] = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];
  selectedSeat: { row: number; col: number } = { row: -1, col: -1 };
  guestCount: number = 4;
  reservationDate: string = '';
  timeSlots: string[] = ['19:00', '19:30', '20:30'];
  selectedTime: string = '';

  private socketUrl = 'ws://localhost:3500';  // WebSocket server URL

  constructor(private websocketService: WebSocketService) {}

  ngOnInit() {
    this.websocketService.connect(this.socketUrl);

    // Subscribe to seat updates from the server
    this.websocketService.getSeatUpdates().subscribe((updatedSeats) => {
      this.updateSeatLayout(updatedSeats);
    });
  }

  ngOnDestroy() {
    this.websocketService.closeConnection();
  }

  selectSeat(row: number, col: number): void {
    if (this.seatLayout[row][col] === 1) {  // If seat is available
      this.selectedSeat = { row, col };
    }
  }

  incrementGuests() {
    if (this.guestCount < 6) this.guestCount++;
  }

  decrementGuests() {
    if (this.guestCount > 1) this.guestCount--;
  }

  selectTime(slot: string) {
    this.selectedTime = slot;
  }

  // Reserve the selected seat
  reserveSeat() {
    if (this.selectedSeat.row !== -1 && this.selectedSeat.col !== -1) {
      this.websocketService.reserveSeat(this.selectedSeat);
      // Temporarily mark the seat as reserved in the UI
      this.seatLayout[this.selectedSeat.row][this.selectedSeat.col] = 0;
    } else {
      alert('Please select a seat first.');
    }
  }

  // Update seat layout when there are seat status changes
  updateSeatLayout(updatedSeats: any) {
    for (let seat of updatedSeats) {
      this.seatLayout[seat.row][seat.col] = seat.status;
    }
  }
}
