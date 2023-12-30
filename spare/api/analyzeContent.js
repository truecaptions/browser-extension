// analyzeContent.js

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const fs = require("fs");

const MODEL_NAME = "gemini-pro-vision";
const API_KEY = "YOUR_API_KEY"; // Replace with your API key

async function analyzeContent(imagePath, callback) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });


  const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      inlineData: {
        mimeType: "image/png",
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
      },
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response.text();
  callback(response);
}

module.exports = analyzeContent;
