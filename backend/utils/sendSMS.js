const twilio = require("twilio");

const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");

const sendSMS = async (phone, location) => {
  try {
    await client.messages.create({
      body: `🚨 SOS! Location: https://maps.google.com/?q=${location.lat},${location.lng}`,
      from: "YOUR_TWILIO_NUMBER",
      to: phone,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sendSMS;