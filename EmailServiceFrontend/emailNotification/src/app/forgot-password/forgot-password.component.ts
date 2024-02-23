import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css', // CSS file for styling
})
export class ForgotPasswordComponent {
  name: string = ''; // Variable to store the user's name
  email: string = ''; // Variable to store the user's email address
  emailSending: boolean = false; // Flag to track if an email is being sent
  newPassword: string = ''; // Variable to store the new password
  confirmNewPassword: string = ''; // Variable to store the confirmed new password
  EmailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regular expression to validate email format

  constructor(private http: HttpClient, private toast: NgToastService) {}

  // Event handler for email input change
  emailChangeHandler($event: any) {
    this.email = $event.target.value;
  }

  // Event handler for name input change
  nameChangeHandler($event: any) {
    this.name = $event.target.value;
  }

  // Event handler for new password input change
  passwordChangeHandler($event: any) {
    this.newPassword = $event.target.value;
  }

  // Event handler for confirm new password input change
  confirmPasswordChangeHandler($event: any) {
    this.confirmNewPassword = $event.target.value;
  }

  // Function to handle forgot password form submission
  forgot_password($event: any) {
    $event.preventDefault(); // Prevent default form submission behavior

    // Validate if passwords match
    if (this.newPassword != this.confirmNewPassword) {
      this.toast.error({
        detail: `Password didn't match!`,
        summary: 'Password and Confirm password should be same',
        duration: 5000,
      });
      return; // Exit function if passwords don't match
    } else if (!this.EmailRegex.test(this.email)) {
      // Validate email format
      this.toast.error({
        detail: `Email is not correct!`,
        summary: 'Please enter a valid email',
        duration: 5000,
      });
      return; // Exit function if email format is incorrect
    }

    // Prepare parameters for sending email
    let params = {
      Name: this.name,
      ToEmail: this.email,
      NewPassword: this.newPassword,
    };

    // Send the email
    this.emailSending = true; // Set email sending flag to true
    this.http
      .post('https://localhost:7137/api/Email/PasswordReset', params, {
        responseType: 'text', // Set response type to text
      })
      .subscribe({
        next: (res: string) => {
          // Handle successful response
          this.emailSending = false; // Set email sending flag to false
          console.log(res); // Log the response to the console

          // Show success toast notification
          this.toast.success({
            detail: 'Password reset Successful !',
            summary: 'New Password has been sent to your Email',
            duration: 5000,
          });
        },
        error: (err: any) => {
          // Handle error response
          // Show error toast notification
          this.toast.error({
            detail: 'Password reset Unsuccessful !',
            summary: err.message, // Display error message
            duration: 5000,
          });
        },
      });
  }
}
