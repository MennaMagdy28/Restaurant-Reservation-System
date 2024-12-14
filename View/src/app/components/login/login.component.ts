import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  err: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  // async ngOnInit(): Promise<void> {
  //   const user = await this.userService.getUser();
  //   if (user) {
  //     this.router.navigate(['/userProfile']);
  //   }
  // }

  async onSubmit(): Promise<void> {
    const data = { email: this.email, password: this.password };
    await this.userService.login(data);
    
  }

  routeSignup(): void {
    this.router.navigate(['/register']);
  }
}
