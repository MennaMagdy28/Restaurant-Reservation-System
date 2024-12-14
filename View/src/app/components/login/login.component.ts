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

  async onSubmit(event: Event) {
    event.preventDefault(); 
    const data = { email: this.email, password: this.password };
    console.log(`data ${data}`)
    try {
      await this.userService.login(data);
      this.router.navigate(['']);
    } catch (error) {
      this.err = 'Login failed. Please try again.';
      console.error(error);
    }
  }
  navigateToSignup(){
    this.router.navigate(['register']);
    
  }
  setEmail(value: string): void {
    this.email = value;
  }

  setPassword(value: string): void {
    this.password = value;
  }

}
