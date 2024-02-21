using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace API.Controllers
{
    public class EmailModel
    {
        public string Name { get; set; } = string.Empty;
        public string ToEmail { get; set; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost("RegistrationSucessfull")]
        public ActionResult RegistrationSucessfull(EmailModel emailData)
        {
            var FromEmail = "priyanshukoley0@gmail.com";
            var Key = "oinq humj srsb kqry";
            var CompanyName = "Promact Infotech";
            var Subject = $"Welcome to {CompanyName} !";

            var message = new MailMessage()
            {
                From = new MailAddress(FromEmail),
                Subject = Subject,
                IsBodyHtml = true,
                Body = $"""
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <p>Hello {emailData.Name},</p>
                            <h1 style="color: #333;">Registration Confirmation</h1>
                            <p style="color: #555;">Thank you for registering!</p>
                            <p style="color: #555;">Your account has been successfully created.</p>
                            <p style="color: #555;">To start using our services, please click the button below to verify your email address:</p>
                            <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Verify Email</a>
                            <small style="color: #555;">If you didn't register on our website, please ignore this email.</small>
                            <p style="color: #555;">Best regards,<br>{CompanyName}</p>
                        </div>
                    </body>
                </html>
                """,
            };
            message.To.Add(new MailAddress(emailData.ToEmail));

            var smtp = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(FromEmail,Key),
                EnableSsl = true,
            };

            smtp.Send(message);

            return Ok("Registration Email Sent");
        }
    }
}