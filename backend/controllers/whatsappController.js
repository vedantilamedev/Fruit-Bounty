import { sendWhatsAppMessage } from "../services/whatsappService.js";

// Test WhatsApp message
export const testWhatsApp = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ message: "Recipient and message are required" });
    }

    const result = await sendWhatsAppMessage(to, message);

    if (!result) {
      return res.status(500).json({ message: "Failed to send WhatsApp message" });
    }

    res.status(200).json({ success: true, data: result, message: "WhatsApp sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};