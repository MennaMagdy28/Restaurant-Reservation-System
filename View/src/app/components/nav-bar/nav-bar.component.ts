import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Correct import from Angular router
import { UserService } from '../../services/user.service'; // Ensure UserService is imported
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports:[NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']

})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the login state (assuming UserService emits a boolean)
    this.userservice.getLoginState().subscribe(state => {
      this.isLoggedIn = state; 
    });
  }

  logout() {
    this.userservice.logout().then(() => {
      // After logout, navigate to the login page
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);  // Navigate to the given path
  }
}
