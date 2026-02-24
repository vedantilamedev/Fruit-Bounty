import axios from "axios";

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL; // Your provider URL
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;     // Your API token

export const sendWhatsAppMessage = async (to, message) => {
  try {
    const payload = {
      to,              // recipient number with country code
      type: "text",
      text: { body: message }
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${WHATSAPP_TOKEN}`
    };

    const response = await axios.post(WHATSAPP_API_URL, payload, { headers });
    return response.data;

  } catch (error) {
    console.error("WhatsApp Error:", error.response?.data || error.message);
    return null;
  }
}