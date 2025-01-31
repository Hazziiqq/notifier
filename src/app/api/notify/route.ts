/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import { connectDB } from '@/dbConfig/dbConfig';
import EmailModel from '@/models/EmailModel';


connectDB();
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email:', email);

    // Check if the email already exists in the database
    const existingEmail = await EmailModel.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists:', email);
      return new Response(JSON.stringify({ message: 'Email already exists.' }), { status: 400 });
    }

    // Store email in the database
    const newEmail = new EmailModel({ email });
    await newEmail.save();
    console.log('Email saved:', newEmail);

    // Send email using Nodemailer
    const emails = await EmailModel.find().select("email -_id");
    const emailList = emails.map((mails) => mails.email);
    console.log('Email list:', emailList);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Connection Error:", error);
      } else {
        console.log("Server is ready to send emails",success);
      }
    });

    const info = await transporter.sendMail({
      from: '"Haziq Saleem" <khaziq109@gmail.com>',
      to: emailList.join(','),
      subject: "its pubg time",
      text: "get your phone charged, your headset ready and lets play.",
    });

    console.log('Email sent:', info);
    return new Response(JSON.stringify({ message: 'Email sent successfully!', info }), { status: 200 });

  } catch (error: any) {
    console.error("Error during request:", error);
    return new Response(JSON.stringify({ message: 'Error sending email.', error: error.message }), { status: 500 });
  }
}
