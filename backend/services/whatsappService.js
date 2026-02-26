import axios from "axios";

console.log("I am just testing", process.env.WHATSAPP_TOKEN)

export const sendWhatsAppMessage = async (to, message) => {
  try {

    const payload = {
      apiKey: process.env.WHATSAPP_TOKEN,
      campaignName: "your_campaign_name",
      destination: to,
      userName: "User",
      templateParams: [message]
    };

    const response = await axios.post(
      process.env.WHATSAPP_API_URL,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("AiSensy Response:", response.data);

    return response.data;

  } catch (error) {
    console.error(
      "WhatsApp Error:",
      error.response?.data || error.message
    );
    return null;
  }
};