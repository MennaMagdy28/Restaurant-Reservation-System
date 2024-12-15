import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private seatStatusSubject = new Subject<any>();

  constructor() {}

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (message) => {
      this.seatStatusSubject.next(JSON.parse(message.data)); 
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  reserveSeat(seat: { row: number; col: number }): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ action: 'reserve', seat }));
    }
  }

  getSeatUpdates() {
    return this.seatStatusSubject.asObservable();
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
