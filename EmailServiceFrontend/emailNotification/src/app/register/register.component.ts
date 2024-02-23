import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'register',
  templateUrl: './register.component.html', // HTML template for the RegisterComponent
  styleUrl: './register.component.css', // CSS file for styling
})
export class RegisterComponent {
  name: string = ''; // Variable to store the user's name
  email: string = ''; // Variable to store the user's email address
  emailSending: boolean = false; // Flag to track if an email is being sent
  password: string = ''; // Variable to store the user's password
  confirmPassword: string = ''; // Variable to store the confirmation password
  EmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regular expression for email validation

  constructor(private http: HttpClient, private toast: NgToastService) {} // Constructor injecting HttpClient and NgToastService

  // Event handler for email input change
  emailChangeHandler($event: any) {
    this.email = $event.target.value;
  }

  // Event handler for name input change
  nameChangeHandler($event: any) {
    this.name = $event.target.value;
  }

  // Event handler for password input change
  passwordChangeHandler($event: any) {
    this.password = $event.target.value;
  }

  // Event handler for confirm password input change
  confirmPasswordChangeHandler($event: any) {
    this.confirmPassword = $event.target.value;
  }

  // Function to handle registration form submission
  register($event: any) {
    $event.preventDefault(); // Prevent default form submission behavior

    // Validation checks for name, email, password, and confirmation password
    if (this.password != this.confirmPassword) {
      this.toast.error({
        detail: `Password didn't match!`,
        summary: 'Password and Confirm password should be same',
        duration: 5000,
      });
      return;
    } else if (this.name.replace(/\s/g, '')==='') {
      this.toast.error({
        detail: `Name can't be empty!`,
        summary: 'Please enter a valid name',
        duration: 5000,
      });
      return;
    } else if (this.password.replace(/\s/g, '') === '') {
      this.toast.error({
        detail: `Password can't be empty!`,
        summary: 'Please enter a valid password',
        duration: 5000,
      });
      return;
    } else if (!this.EmailRegex.test(this.email)) {
      this.toast.error({
        detail: `Email is not correct!`,
        summary: 'Please enter a valid email',
        duration: 5000,
      });
      return;
    }
    let params = {
      Name: this.name,
      ToEmail: this.email,
    };

    // Send the email and handle the response
    this.emailSending = true; // Set email sending flag to true
    this.http
      .post('https://localhost:7137/api/Email/RegistrationSuccessful', params, {
        responseType: 'text',
      })
      .subscribe({
        next: (res) => {
          // On successful response
          console.log(res);

          // Show success toast notification
          this.toast.success({
            detail: 'Registration Successful!',
            summary: 'Registration confirmation email sent',
            duration: 5000,
          });

          this.emailSending = false; // Set email sending flag to false
        },
        error: (err: any) => {
          // On error response
          // Show error toast notification
          this.toast.error({
            detail: 'Registration Unsuccessful!',
            summary: err.message,
            duration: 5000,
          });
        },
      });
  }
}
