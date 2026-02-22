// controllers/contactController.js
import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save contact to DB
    const contact = await Contact.create({ name, email, message });

    const adminEmail = process.env.BREVO_ADMIN_EMAIL;

    // Send email to admin (only if configured)
    if (adminEmail) {
      await sendEmail({
        email: adminEmail,
        subject: `New Contact Form Submission from ${name}`,
        message: `
          <h3>New Contact Form Submission</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      });
    } else {
      console.warn("BREVO_ADMIN_EMAIL is missing in .env, skipping admin email");
    }

    // Send confirmation email to user
    await sendEmail({
      email,
      subject: "We received your message",
      message: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting <b>Fruits Bounty</b>! We received your message:</p>
        <blockquote>${String(message).replace(/\n/g, "<br/>")}</blockquote>
        <p>We will get back to you soon.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully and notifications delivered",
      data: contact,
    });
  } catch (error) {
    console.error("submitContactForm error:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};
