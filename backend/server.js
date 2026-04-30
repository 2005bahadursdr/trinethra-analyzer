
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { buildPrompt } from "./prompt.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" })); // prevent large body crash

app.post("/analyze", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    //  reduce load (important for llama3.2)
    const shortTranscript = transcript.slice(0, 1500);

    const prompt = buildPrompt(shortTranscript);

    console.log("Sending request to Ollama...");

    //  timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3.2", // you can switch to "phi3" for speed
        prompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Ollama API failed");
    }

    const data = await response.json();

    if (!data || !data.response) {
      throw new Error("Empty response from model");
    }

    console.log(" Response received");

    let parsed;

    try {
      parsed = JSON.parse(data.response);
    } catch (err) {
      console.log("JSON parse failed");

      return res.json({
        error: true,
        raw: data.response
      });
    }

    res.json(parsed);

  } catch (error) {
    console.error(" Backend error:", error.message);

    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});