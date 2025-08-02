const fetch = require("node-fetch");

async function sendNtfyNotification(topic, title, message) {
  const url = `https://ntfy.sh/${topic}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Title": title },
      body: message,
    });

    if (!response.ok) {
      console.error(`Failed to send notification: ${response.statusText}`);
    } else {
      console.log(`Notification sent`);
    }
  } catch (error) {
    console.error("Error sending notification:", error.message);
  }
}

module.exports = sendNtfyNotification;

// ✅ Test this module standalone
if (require.main === module) {
  const topic = "sE3nB7BvgYHIUBD5";
  const title = "Test Notification";
  const message = "This is a test message from ntfy.js module";

  sendNtfyNotification(topic,title,message)
}