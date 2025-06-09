const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API endpoint to generate murder mystery
app.post('/api/generate-mystery', async (req, res) => {
  try {
    const { setting, era, characterCount, genre } = req.body;
    
    // Create the prompt for OpenAI
    const prompt = `Generate a murder mystery script with the following parameters:
      - Setting: ${setting || 'An isolated mansion'}
      - Era: ${era || 'Victorian'}
      - Number of characters: ${characterCount || 5}
      - Genre: ${genre || 'Classic detective'}
      
      Format the response as a JSON object with these fields:
      - synopsis: A paragraph describing the setup and mystery
      - characters: An array of objects, each with 'name' and 'description'
      - clues: An array of strings representing the key clues
      - solution: A paragraph revealing who did it and how
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a creative murder mystery writer with expertise in crafting engaging whodunnit narratives." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      max_tokens: 1000,
    });

    // Parse the response
    let responseContent = completion.choices[0].message.content;
    
    // Try to parse the JSON from the response
    try {
      // First, find JSON if it's embedded in markdown or other text
      const jsonMatch = responseContent.match(/```json\n([\s\S]*)\n```/) || 
                       responseContent.match(/```\n([\s\S]*)\n```/) ||
                       [null, responseContent];
      
      const jsonString = jsonMatch[1];
      const parsedResponse = JSON.parse(jsonString);
      
      // Send the parsed response
      res.json(parsedResponse);
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      // If parsing fails, send the raw response
      res.json({ 
        error: "Could not parse the AI response into the expected format", 
        rawResponse: responseContent 
      });
    }  } catch (error) {
    console.error('Error calling OpenAI:', error);
    
    // Send a more specific error message for quota issues
    if (error.code === 'insufficient_quota' || 
        (error.message && error.message.includes('quota exceeded'))) {
      return res.status(200).json({ 
        quotaExceeded: true,
        message: "Using mock data due to OpenAI quota limits"
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
