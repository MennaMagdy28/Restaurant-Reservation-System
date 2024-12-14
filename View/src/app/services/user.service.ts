import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3500';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (userId && username && role) {
      this.isLoggedInSubject.next(true); 
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  getLoginState() {
    return this.isLoggedInSubject.asObservable();
  }

  login(loginData: { email: string; password: string }) {
    return fetch(`${this.url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(loginData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.user) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('role', data.user.role);
        this.isLoggedInSubject.next(true); 
        this.router.navigateByUrl('/home');
      }
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
      this.isLoggedInSubject.next(true);
      return data;
    })
    .catch(error => {
      console.error('Error during signup:', error);
      throw error;
    });
  }

  async logout() {
    await fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      this.clearCookies();
      localStorage.clear();
      this.isLoggedInSubject.next(false);
      this.router.navigateByUrl('/login');
    })
    .catch(error => {
      console.error('Error during logout:', error);
      throw error;
    });
  }

  private clearCookies(): void {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
