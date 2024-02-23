import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'login',
  templateUrl: './login.component.html', // HTML template for the LoginComponent
  styleUrl: './login.component.css', // CSS file for styling
})
export class LoginComponent {
  email: string = ''; // Variable to store the user's email address
  emailSending: boolean = false; // Flag to track if an email is being sent
  emailSent: boolean = false; // Flag to track if an email has been sent
  password: string = ''; // Variable to store the user's password

  constructor(private toast: NgToastService) {} // Constructor injecting NgToastService for toast notifications

  // Event handler for email input change
  emailChangeHandler($event: any) {
    this.email = $event.target.value;
  }

  // Event handler for password input change
  passwordChangeHandler($event: any) {
    this.password = $event.target.value;
  }

  // Function to handle login form submission
  login($event: any) {
    $event.preventDefault(); // Prevent default form submission behavior

    // Show error toast notification indicating login functionality is not implemented
    this.toast.error({
      detail: 'Login functionality has not been added !',
      duration: 5000, // Set duration for toast notification
    });
  }
}
