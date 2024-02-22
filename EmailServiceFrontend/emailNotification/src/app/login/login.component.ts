import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  emailSending: boolean = false;
  emailSent: boolean = false;
  password: string = '';

  constructor() {}
  emailChangeHandler($event: any) {
    this.email = $event.target.value;
  }
  passwordChangeHandler($event: any) {
    this.password = $event.target.value;
  }

  login() {
    alert('Login functionality has not been added !');
  }

  
}