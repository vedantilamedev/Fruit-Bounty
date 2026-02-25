import axios from "axios";

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL?.trim();
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY?.trim();

export const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        destination: to,
        source: "external",
        message: {
          type: "text",
          text: message
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-AiSensy-Project-API-Pwd": WHATSAPP_API_KEY
        }
      }
    );

    console.log("WhatsApp response:", response.data);
    return response.data;

  } catch (error) {
    console.error("WhatsApp Error:", error.response?.data || error.message);
    return null;
  }
};