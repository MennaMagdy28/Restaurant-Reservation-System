import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./components/signup/signup.component";
import { HomePageComponent } from "./components/homepage/homepage.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignupComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
}
