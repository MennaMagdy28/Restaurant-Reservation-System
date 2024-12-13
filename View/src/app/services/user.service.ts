import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3500'
  constructor() { }
  login(loginData: { email: string; password: string }): Promise<any> {
    return fetch(`${this.url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData),
      credentials: 'include' 
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {

        if (data.userInfo) {
          // Set the cookie
          document.cookie = `authToken=${data.userInfo}; path=/; secure; HttpOnly; SameSite=Strict`;
          console.log(`sasa + ${document.cookie}`)

        }

        return data;
      })
      .catch(error => {
        console.error('Error during login:', error);
        throw error;
      });
  }
  signup(signupData: { username: string; email: string; password: string;}): Promise<any> {
    return fetch(`${this.url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      return response.json();
    })
    .then(data => {
      if (data.userInfo) {
        document.cookie = `authToken=${data.userInfo}; path=/; secure; HttpOnly; SameSite=Strict`;
        console.log(`Cookie set: ${document.cookie}`);
      }
      return data;
    })
    .catch(error => {
      console.error('Error during signup:', error);
      throw error;
    });
  }
}
