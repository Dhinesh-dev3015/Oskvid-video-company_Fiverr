"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  surname: string
  email: string
  message: string
}

export async function sendContactForm(formData: ContactFormData) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "ricardsoss22@gmail.com", // Fallback to the target email
        pass: process.env.EMAIL_PASSWORD, // You'll need to set this in your environment variables
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "website@oskvid.com",
      to: "ricardsoss22@gmail.com",
      subject: `Contact Form: ${formData.name} ${formData.surname}`,
      text: `
Name: ${formData.name} ${formData.surname}
Email: ${formData.email}

Message:
${formData.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${formData.name} ${formData.surname}</p>
  <p><strong>Email:</strong> ${formData.email}</p>
  <h3 style="color: #555;">Message:</h3>
  <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ffd700;">${formData.message.replace(/\n/g, "<br>")}</p>
</div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email" }
  }
}
