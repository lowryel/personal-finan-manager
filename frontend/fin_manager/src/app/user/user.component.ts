import { Component, inject } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  debugger:any

  credentials = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private route: Router) {}

  login() {
    this.loginService.loginApp(this.credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log(response);
        localStorage.setItem("token", response["access"])
        this.route.navigateByUrl("/")
      },
      (error) => {
        // Handle login error
        alert("Login failed. Check your credentials")
        console.error('Login failed', error);
      }
    );
  }
}

