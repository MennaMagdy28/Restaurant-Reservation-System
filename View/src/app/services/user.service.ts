import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3500'; 
  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(loginData: { email: string; password: string }): Promise<any> {
    return fetch(`${this.url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Ensure cookies are included
      body: JSON.stringify(loginData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      this.isLoggedIn = true;
      return response.json();
    })
    .then(data => {
      console.log('Login successful:', data);
      this.router.navigateByUrl('/home'); // Navigate to home on successful login
      return data;
    })
    .catch(error => {
      console.error('Error during login:', error);
      throw error;
    });
  }

  signup(signupData: { username: string; email: string; password: string }): Promise<any> {
    return fetch(`${this.url}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(signupData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Signup successful:', data);
      this.isLoggedIn = true;
      return data;
    })
    .catch(error => {
      console.error('Error during signup:', error);
      throw error;
    });
  }

  getLoginState(): boolean {
    return this.isLoggedIn;
  }
}
