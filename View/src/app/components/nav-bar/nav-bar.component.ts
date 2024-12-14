import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private userservice:UserService,private router: Router){}
  
  get isLoggedIn(): boolean {
    return this.userservice.getLoginState();
  }

  logout(){
    this.userservice.logout()
  }
}
