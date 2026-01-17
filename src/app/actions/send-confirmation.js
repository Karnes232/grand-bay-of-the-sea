"use server"

import grandbayEmail from "@/emails/grandbayEmail"
import grandbayFishingEmail from "@/emails/grandbayFishingEmail"
import grandbayTripEmail from "@/emails/grandbayTripEmail"
import { render } from "@react-email/render"
import nodemailer from "nodemailer"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendConfirmationEmail(bookingData) {
  console.log(bookingData)
  try {
    // console.log("SMTP User exists:", !!process.env.SMTP_USER)
    // console.log("SMTP Password exists:", !!process.env.SMTP_PASSWORD)
    // Create email HTML
    const emailComponent = grandbayEmail(bookingData)
    const emailHtml = render(emailComponent)
    const finalHtml = emailHtml instanceof Promise ? await emailHtml : emailHtml

    // Configure nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   debug: true,
    // })

    // try {
    //   await transporter.verify()
    //   console.log("SMTP connection verified successfully")
    // } catch (verifyError) {
    //   console.error("SMTP verification failed:", verifyError)
    //   throw new Error(`SMTP verification failed: ${verifyError.message}`)
    // }

    // let mailDetails = {
    //   from: `"Grand Bay of the Sea" ${process.env.SMTP_USER}`,
    //   replyTo: `grandbayofthesea@gmail.com`,
    //   to: bookingData.customerEmail,
    //   subject: "Grand Bay of the Sea",
    //   html: finalHtml,
    // }

    // Send email
    // const result = await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //       console.log("Error sending email:", err)
    //       reject(err)
    //     } else {
    //       console.log("Email sent successfully")
    //       resolve(data)
    //     }
    //   })
    // })
    const result = await resend.emails.send({
      from: "Grand Bay of the Sea <bookings@grandbay-puntacana.com>",
      to: bookingData.customerEmail,
      replyTo: "grandbayofthesea@gmail.com",
      subject: "Grand Bay of the Sea",
      html: finalHtml,
    })
    console.log(result)
    // Return success response instead of using res.status()
    return { success: true, message: "Email sent successfully", data: result }
  } catch (error) {
    console.error("Failed to send email:", error)
    // Return error response instead of using res.status()
    return { success: false, message: error.message }
  }
}

export async function sendConfirmationFishingEmail(bookingData) {
  try {
    // console.log("SMTP User exists:", !!process.env.SMTP_USER)
    // console.log("SMTP Password exists:", !!process.env.SMTP_PASSWORD)
    // Create email HTML
    const emailComponent = grandbayFishingEmail(bookingData)
    const emailHtml = render(emailComponent)
    const finalHtml = emailHtml instanceof Promise ? await emailHtml : emailHtml

    // Configure nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   debug: true,
    // })

    // let mailDetails = {
    //   from: `"Grand Bay of the Sea" ${process.env.SMTP_USER}`,
    //   replyTo: `grandbayofthesea@gmail.com`,
    //   to: bookingData.customerEmail,
    //   subject: "Grand Bay of the Sea",
    //   html: finalHtml,
    // }

    // // Send email
    // const result = await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //       console.log("Error sending email:", err)
    //       reject(err)
    //     } else {
    //       console.log("Email sent successfully")
    //       resolve(data)
    //     }
    //   })
    // })

    const result = await resend.emails.send({
      from: "Grand Bay of the Sea <bookings@grandbay-puntacana.com>",
      to: bookingData.customerEmail,
      replyTo: "grandbayofthesea@gmail.com",
      subject: "Grand Bay of the Sea",
      html: finalHtml,
    })
    // Return success response instead of using res.status()
    return { success: true, message: "Email sent successfully", data: result }
  } catch (error) {
    console.error("Failed to send email:", error)
    // Return error response instead of using res.status()
    return { success: false, message: error.message }
  }
}

export async function sendConfirmationTripEmail(bookingData) {
  try {
    // console.log("SMTP User exists:", !!process.env.SMTP_USER)
    // console.log("SMTP Password exists:", !!process.env.SMTP_PASSWORD)
    // Create email HTML
    const emailComponent = grandbayTripEmail(bookingData)
    const emailHtml = render(emailComponent)
    const finalHtml = emailHtml instanceof Promise ? await emailHtml : emailHtml

    // Configure nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    //   debug: true,
    // })

    // let mailDetails = {
    //   from: `"Grand Bay of the Sea" ${process.env.SMTP_USER}`,
    //   replyTo: `grandbayofthesea@gmail.com`,
    //   to: bookingData.customerEmail,
    //   subject: "Grand Bay of the Sea",
    //   html: finalHtml,
    // }

    // // Send email
    // const result = await new Promise((resolve, reject) => {
    //   transporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //       console.log("Error sending email:", err)
    //       reject(err)
    //     } else {
    //       console.log("Email sent successfully")
    //       resolve(data)
    //     }
    //   })
    // })

    const result = await resend.emails.send({
      from: "Grand Bay of the Sea <bookings@grandbay-puntacana.com>",
      to: bookingData.customerEmail,
      replyTo: "grandbayofthesea@gmail.com",
      subject: "Grand Bay of the Sea",
      html: finalHtml,
    })
    // Return success response instead of using res.status()
    return { success: true, message: "Email sent successfully", data: result }
  } catch (error) {
    console.error("Failed to send email:", error)
    // Return error response instead of using res.status()
    return { success: false, message: error.message }
  }
}
