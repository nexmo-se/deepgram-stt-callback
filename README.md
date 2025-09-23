# Deepgram STT Callback Sample App

This sample demonstrates how to use Deepgram's callback feature for asynchronous speech-to-text (STT) processing.

## 1. Prepare Environment Variables

Create a `.env` file in the project root with your Deepgram API key:

```env
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

Or copy the sample and edit:

```sh
cp .env.sample .env
# Then edit .env and add your Deepgram API key
```

Example `.env.sample`:

```env
# Rename this file to .env and add your Deepgram API key
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

## 2. Start the Callback Server

```sh
npm install
npm start
```

The server will listen on `http://localhost:3000/callback` by default.

## 3. Expose Your Server to the Internet

Deepgram must be able to reach your callback endpoint. Use [ngrok](https://ngrok.com/) or a similar tool:

```sh
npx ngrok http 3000
```

Copy the public URL shown by ngrok (e.g., `https://xxxx.ngrok.app`).

## 4. Send Audio to Deepgram with Callback

For demo purposes, use the provided `sample.wav` (from [audio sample source](https://audio-samples.github.io/#section-1)).

```sh
node send-to-deepgram.js sample.wav https://xxxx.ngrok.app/callback
```

Replace `https://xxxx.ngrok.app/callback` with your actual ngrok URL.

## 5. View Transcription Results

When Deepgram finishes processing, it will POST the transcription result to your callback endpoint. The server will log the result to the console.

Example Response will appear in server logs:

```js
/callback
Received callback from Deepgram!
dg-token header: 55ccd57e-8694-435e-80b3-1d822fde5661
Transcription result: {
  "metadata": {
    "transaction_key": "deprecated",
    "request_id": "51712a9a-9c10-4128-8e9d-6741cbff5c7f",
    "sha256": "0775320b576de41f9440d2732fd21da18a6663234992b887e1250f4b43f1c6f7",
    "created": "2025-09-23T21:32:34.076Z",
    "duration": 10.042625,
    "channels": 1,
    "models": [
      "1ed36bac-f71c-4f3f-a31f-02fd6525c489"
    ],
    "model_info": {
      "1ed36bac-f71c-4f3f-a31f-02fd6525c489": {
        "name": "general",
        "version": "2024-01-26.8851",
        "arch": "base"
      }
    }
  },
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "above all the warfare of he spirit at that epic was perpetuated her edward not of him not so un his maze world",
            "confidence": 0.98095703,
            "words": [
              {
                "word": "above",
                "start": 0.51742065,
                "end": 0.676627,
                "confidence": 0.99902344
              },
              {
                "word": "all",
                "start": 0.676627,
                "end": 0.99503964,
                "confidence": 0.99902344
              },
              {
                "word": "the",
                "start": 1.2338492,
                "end": 1.3930556,
                "confidence": 0.9995117
              },
              {
                "word": "warfare",
                "start": 1.3930556,
                "end": 1.8706746,
                "confidence": 0.9995117
              },
              {
                "word": "of",
                "start": 1.8706746,
                "end": 1.9502777,
                "confidence": 0.9897461
              },
              {
                "word": "he",
                "start": 2.029881,
                "end": 2.5075,
                "confidence": 0.9941406
              },
              {
                "word": "spirit",
                "start": 2.5075,
                "end": 2.8259127,
                "confidence": 0.99902344
              },
              {
                "word": "at",
                "start": 2.8259127,
                "end": 3.064722,
                "confidence": 0.9897461
              },
              {
                "word": "that",
                "start": 3.064722,
                "end": 3.3035316,
                "confidence": 0.99853516
              },
              {
                "word": "epic",
                "start": 3.3035316,
                "end": 3.8035316,
                "confidence": 0.9448242
              },
              {
                "word": "was",
                "start": 4.0995636,
                "end": 4.5771823,
                "confidence": 0.9980469
              },
              {
                "word": "perpetuated",
                "start": 4.5771823,
                "end": 5.0771823,
                "confidence": 0.99902344
              },
              {
                "word": "her",
                "start": 5.214008,
                "end": 5.3732142,
                "confidence": 0.9638672
              },
              {
                "word": "edward",
                "start": 6.4876585,
                "end": 6.8856745,
                "confidence": 0.7602539
              },
              {
                "word": "not",
                "start": 6.8856745,
                "end": 7.044881,
                "confidence": 0.98095703
              },
              {
                "word": "of",
                "start": 7.044881,
                "end": 7.2040873,
                "confidence": 0.9638672
              },
              {
                "word": "him",
                "start": 7.2040873,
                "end": 7.3632936,
                "confidence": 1
              },
              {
                "word": "not",
                "start": 7.761309,
                "end": 8.000119,
                "confidence": 0.99902344
              },
              {
                "word": "so",
                "start": 8.000119,
                "end": 8.159326,
                "confidence": 0.9995117
              },
              {
                "word": "un",
                "start": 8.159326,
                "end": 8.477738,
                "confidence": 0.24353027
              },
              {
                "word": "his",
                "start": 9.03496,
                "end": 9.353373,
                "confidence": 0.9892578
              },
              {
                "word": "maze",
                "start": 9.353373,
                "end": 9.671785,
                "confidence": 0.6411133
              },
              {
                "word": "world",
                "start": 9.671785,
                "end": 10.042625,
                "confidence": 0.96484375
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## 6. Authentication

The server logs the `dg-token` header sent by Deepgram for authentication. You can add logic to verify this header if needed.

---

For more details, see Deepgram's documentation: https://developers.deepgram.com/docs/callback
