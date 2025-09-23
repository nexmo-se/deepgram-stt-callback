// Simple Express server to receive Deepgram STT callback
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// If you need to make outbound Deepgram API calls from this server, uncomment below:
// const { createClient } = require("@deepgram/sdk");
// const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
// if (!process.env.DEEPGRAM_API_KEY || process.env.DEEPGRAM_API_KEY.length < 10) {
//   console.error("❌ Invalid or missing Deepgram API key!");
//   console.error(
//     "Current key:",
//     process.env.DEEPGRAM_API_KEY
//       ? `${process.env.DEEPGRAM_API_KEY.substring(0, 8)}...`
//       : "undefined"
//   );
//   process.exit(1);
// }
// For callback-only servers, Deepgram API key is not required.
// However, you do need it in the client (node send-to-deepgram.js) that sends audio to Deepgram.

// Parse JSON bodies
app.use(bodyParser.json({ limit: "10mb" }));

// Callback endpoint
app.post("/callback", (req, res) => {
  // Log Deepgram's dg-token header (for authentication)
  const dgToken = req.headers["dg-token"];
  console.log("Received callback from Deepgram!");
  if (dgToken) {
    console.log("dg-token header:", dgToken);
  }
  // Log the transcription result
  console.log("Transcription result:", JSON.stringify(req.body, null, 2));
  // Respond with 200 OK
  res.status(200).send("Received");
});

app.listen(PORT, () => {
  console.log(`Callback server listening on port ${PORT}`);
  console.log(`POST callbacks to http://localhost:${PORT}/callback`);
});
