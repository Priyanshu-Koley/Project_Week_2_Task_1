import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  emailSending: boolean = false;
  emailSent: boolean = false;
  password: string='';
  confirmPassword: string='';

  constructor(private http: HttpClient) {}
  emailChangeHandler($event: any) {
    this.email = $event.target.value;
  }
  nameChangeHandler($event: any) {
    this.name = $event.target.value;
  }
  passwordChangeHandler($event: any) {
    this.password = $event.target.value;
  }
  confirmPasswordChangeHandler($event: any) {
    this.confirmPassword = $event.target.value;
  }
  
  register($event: any) {
    $event.preventDefault();

    let params = {
      Name: this.name,
      ToEmail: this.email,
    };
    
    // Send the email here
    this.emailSending = true;
    this.http
      .post('https://localhost:7137/api/Email/RegistrationSuccessful', params, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          this.emailSent = true;
          this.emailSending = false;
          setInterval(() => {
            this.emailSent = false;
          },5000);
        },
    });

  }

}