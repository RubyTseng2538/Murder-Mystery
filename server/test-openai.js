require('dotenv').config();
const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testOpenAI() {
  try {
    console.log("Testing OpenAI API connection...");
    console.log("API Key (first few chars):", process.env.OPENAI_API_KEY.substring(0, 10) + "...");
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, how are you?" }
      ],
      model: "gpt-3.5-turbo",
    });

    console.log("OpenAI API Test Success!");
    console.log("Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API Test Failed:");
    console.error(error);
  }
}

testOpenAI();
