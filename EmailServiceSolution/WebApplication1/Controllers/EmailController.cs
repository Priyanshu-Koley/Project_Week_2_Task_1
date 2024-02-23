using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace API.Controllers
{
    // Define model for registration successful email
    public class RegistrationSuccessfulEmailModel
    {
        public string Name { get; set; } = string.Empty; // Name of the recipient
        public string ToEmail { get; set; } = string.Empty; // Email address of the recipient
    }

    // Define model for password reset email
    public class PasswordResetEmailModel
    {
        public string Name { get; set; } = string.Empty; // Name of the recipient
        public string ToEmail { get; set; } = string.Empty; // Email address of the recipient
        public string NewPassword { get; set; } = string.Empty; // Newly created password
    }

    // Controller for handling email-related operations
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        // Sender's email address and key
        public string FromEmail = "priyanshukoley0@gmail.com";
        public string Key = "oinq humj srsb kqry";

        // Company name used in email templates
        public string CompanyName = "Promact Infotech";

        // Endpoint for sending registration successful email
        [HttpPost("RegistrationSuccessful")]
        public ActionResult RegistrationSuccessful(RegistrationSuccessfulEmailModel emailData)
        {
            var Subject = $"Welcome to {CompanyName} !";

            // Construct the email message
            var message = new MailMessage()
            {
                From = new MailAddress(FromEmail), // Sender email address
                Subject = Subject, // Email subject
                IsBodyHtml = true, // Flag to set body to HTML
                // Email body
                Body = $"""
                <html>
                    <body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px 0px;">
                        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <p>Hello {emailData.Name},</p>
                            <h1 style="color: #333;">Registration Confirmation</h1>
                            <p style="color: #555;">Thank you for registering!</p>
                            <p style="color: #555;">Your account has been successfully created.</p>
                            <p style="color: #555;">To start using our services, please click the button below to verify your email address:</p>
                            <a href="http://localhost:4200" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Login</a>
                            <small style="color: #555; display:block; margin-top: 10px">If you didn't register on our website, please ignore this email.</small>
                            <p style="color: #555;">Best regards,<br>{CompanyName}</p>
                        </div>
                    </body>
                </html>
                """,
            };

            // Add recipient's email address
            message.To.Add(new MailAddress(emailData.ToEmail));

            // Create new SMTP client
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                // Using google SMTP server
                Port = 587,
                Credentials = new NetworkCredential(FromEmail, Key),
                EnableSsl = true,
            };
            // Sent Email
            smtp.Send(message);

            // Return success message
            return Ok("Registration Confirmation Email Sent");
        }

        // Endpoint for sending password reset confirmation email
        [HttpPost("PasswordReset")]
        public ActionResult PasswordReset(PasswordResetEmailModel emailData)
        {
            var SupportEmail = "support@promact.com"; // Support email placeholder
            var Subject = $"Password reset successful"; // Email subject

            // Construct the email message
            var message = new MailMessage()
            {
                From = new MailAddress(FromEmail), // Sender email address
                Subject = Subject, // Email subject
                IsBodyHtml = true, // Flag to set body to HTML
                // Email body
                Body = $"""
                <html>
                    <body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px 0px;">
                        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <p>Hello {emailData.Name},</p>
                            <h1 style="color: #333;">Password Reset Confirmation</h1>
                            <p style="color: #555;">Your password has been successfully changed.</p>
                            <p style="color: #555;">New password: {emailData.NewPassword}</p>
                            <p style="color: #555;">Please save it for future. Do not share it to anyone.</p>
                            <a href="http://localhost:4200" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Login</a>
                            <small style="color: #555; display:block; margin-top: 10px">If you didn't changed the password, please reach us at {SupportEmail}</small>
                            <p style="color: #555;">Best regards,<br>{CompanyName}</p>
                        </div>
                    </body>
                </html>
                """,
            };

            // Add recipient's email address
            message.To.Add(new MailAddress(emailData.ToEmail));

            // Create SMTP client
            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(FromEmail, Key),
                EnableSsl = true,
            };
            // Send email
            smtp.Send(message);

            // Return success message
            return Ok("Password Reset Confirmation Email Sent");
        }
    }
}