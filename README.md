# Restaurant Reservation System

The Restaurant Reservation System is a web application that allows customers to book tables at restaurants, vendors to manage reservations, and real-time updates via WebSocket.

## Features
- Customer and vendor modules for managing reservations.
- Real-time seat updates using WebSocket.
- Email notifications for reservation confirmations.

---

## API Endpoints

### Authentication
- **POST** `/login`  
  Logs in a user. Requires valid credentials.

- **POST** `/register`  
  Registers a new user. Requires valid user details.

- **POST** `/logout`  
  Logs out the user by clearing the authentication token.

---

### Reservation (Customer Module)
- **POST** `/reserv/`  
  Creates a new reservation.  
  **Request Body:**  
  ```json
  {
    "customer_id": "string",
    "restaurant_id": "string",
    "table_id": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:mm"
  }
  ```

- **DELETE** `/reserv/:id`  
  Cancels a reservation by ID.

- **GET** `/reserv/:id`  
  Retrieves reservation details by ID.

- **GET** `/reserv/customer/:customer_id`  
  Retrieves all reservations for a specific customer.

---

### Reservation (Vendor Module)
- **GET** `/reserv/vendor/:restaurant_id`  
  Retrieves all reservations for a specific restaurant.

---

### WebSocket
- **Connection URL:** `ws://localhost:3500`  
  Establishes a WebSocket connection for real-time updates.

- **Events:**
  - **`message`**: General communication with the server.
  - **`book Table`**: Triggered when a table is reserved. Sends reservation details.

---

## WebSocket Service (Frontend)
The Angular frontend uses a `WebSocketService` to handle real-time updates.

### Methods
- **`connect(url: string)`**  
  Connects to the WebSocket server.

- **`reserveSeat(seat: { row: number; col: number })`**  
  Sends a seat reservation request.

- **`getSeatUpdates()`**  
  Subscribes to seat status updates.

- **`closeConnection()`**  
  Closes the WebSocket connection.

---

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. Start the Angular frontend:
   ```bash
   ng serve
   ```

---

## Notes
- Ensure `.env` contains valid email credentials for sending notifications.
- WebSocket server runs on port `3500`.