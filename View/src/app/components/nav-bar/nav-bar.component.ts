import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit() {
    this.userservice.getLoginState().subscribe(state => {
      this.isLoggedIn = state; 
    });
  }

  logout() {
    this.userservice.logout().then(() => {
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}
