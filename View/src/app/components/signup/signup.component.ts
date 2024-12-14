import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  err: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  setName(value: string): void {
    this.username = value;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  setPassword(value: string): void {
    this.password = value;
  }

  setConfirmPassword(value: string): void {
    this.confirmPassword = value;
  }

  onSubmit(event: Event): void {
    event.preventDefault(); 

    if (this.password !== this.confirmPassword) {
      this.err = 'Passwords do not match!';
      return;
    }
//{ email, password ,username} 
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    console.log(userData);
    this.userService.signup(userData).then((response) => {
      console.log('User signed up successfully', response);
      // this.router.navigate(['/login']); 
    }).catch((error) => {
      this.err = error?.message || 'Signup failed!';
      console.error('Signup error:', error);
    });
  }

  routeLogin(): void {
    this.router.navigate(['/login']); 
  }
}
