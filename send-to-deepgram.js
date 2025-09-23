// Send audio to Deepgram with callback URL. Usage:
//   node send-to-deepgram.js <AUDIO_FILE_PATH> <CALLBACK_URL>

require("dotenv").config();
const fs = require("fs");
const https = require("https");

let apiKey, audioPath, callbackUrl;
if (process.argv.length === 4) {
  apiKey = process.env.DEEPGRAM_API_KEY;
  audioPath = process.argv[2];
  callbackUrl = process.argv[3];
} else if (process.argv.length === 5) {
  apiKey = process.argv[2];
  audioPath = process.argv[3];
  callbackUrl = process.argv[4];
} else {
  console.error(
    "Usage: node send-to-deepgram.js <AUDIO_FILE_PATH> <CALLBACK_URL>"
  );
  process.exit(1);
}

if (!apiKey || apiKey.length < 10) {
  console.error("❌ Invalid or missing Deepgram API key!");
  process.exit(1);
}

const audioData = fs.readFileSync(audioPath);

const options = {
  hostname: "api.deepgram.com",
  path: `/v1/listen?callback=${encodeURIComponent(callbackUrl)}`,
  method: "POST",
  headers: {
    Authorization: `Token ${apiKey}`,
    "Content-Type": "audio/wav",
    "Content-Length": audioData.length,
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log("Deepgram API response:", data);
  });
});

req.on("error", (e) => {
  console.error("Request error:", e);
});

req.write(audioData);
req.end();
