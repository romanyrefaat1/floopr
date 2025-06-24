"use server";

import emailjs from "@emailjs/nodejs";

export default async function sendEmail() {
  
  const email = "refaatromany641@gmail.com";
  const firstName = "Romany";

  try {
    // Initialize EmailJS with the public key
    console.log(
      "Initializing EmailJS with public key...",
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
    );
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string);

    // Define the email parameters
    const templateParams = {
      name: firstName,
      email: email,
    };

    // Send the email using EmailJS
    
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID as string,
      process.env.EMAILJS_TEMPLATE_ID as string,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
    );

    
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error);
  }
}
