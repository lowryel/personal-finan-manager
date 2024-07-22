import { Component } from '@angular/core';

import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  constructor(private service:LoginService, private router:Router){}
  credentials = {
    username: '',
    email: '',
    password1: '',
    password2: ''
  };

  registerUser() {
    this.service.registerUser(this.credentials).subscribe(
      () => {
        // Handle successful user register
        // this.service.currentUser.set(response.access)
        this.router.navigateByUrl("/")
      },
      (error) => {
        // Handle login error
        alert("User registration failed. Check your credentials")
        console.error('Registration failed', error);
      }
    );
  }

}
