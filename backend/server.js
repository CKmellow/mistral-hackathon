require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
const jwtSecret = process.env.JWT_SECRET;
const axios = require('axios');


async function connectToDb() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db("Hustle-db");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to the database');
    }
}

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];    
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//app.post('/api/mistral', authMiddleware, async (req, res) => {
app.post('/api/mistral', async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for African youth looking for career, funding, or educational opportunities.' },
          { role: 'user', content: userPrompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const message = response.data.choices[0].message.content;
    res.json({ reply: message }); // ✅ simplified response
  } catch (error) {
    console.error('Mistral error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Mistral' });
  }
});

// Provide community interview questions for Pamoja Hub
app.get('/api/mistral-questions', (req, res) => {
  res.json({
    questions: [
      {
        question: "What skills do you have that might help neighbors?",
        name: "skills",
        placeholder: "e.g. Cooking, carpentry, first aid, driving..."
      },
      {
        question: "What kind of support might you need sometimes?",
        name: "support",
        placeholder: "e.g. Childcare, errands, tech help..."
      },
      {
        question: "Do you speak any other languages?",
        name: "languages",
        placeholder: "e.g. Swahili, French, sign language..."
      },
      {
        question: "Do you have any medical or emergency training?",
        name: "medical",
        placeholder: "e.g. Nurse, CPR certified, none..."
      }
    ]
  });
});

// Community Interview AI summary and feedback endpoint
app.post('/api/mistral-summary', async (req, res) => {
  const { skills, support, languages, medical } = req.body;
  try {
    const prompt = `Here are my answers for a community mutual aid interview.\nSkills: ${skills}\nSupport needed: ${support}\nLanguages: ${languages}\nMedical/Emergency: ${medical}\n\nPlease provide a friendly, short summary of how I can help and what I might need, as if for a community dashboard. Then, give 1-2 sentences of constructive feedback or encouragement for this person as a community member.`;
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'system', content: 'You are a helpful, community-focused assistant for a mutual aid platform.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const content = response.data.choices[0].message.content;
    // Try to split summary and feedback if possible
    let summary = content;
    let feedback = "";
    const split = content.split(/Feedback:|Encouragement:|\n\n/);
    if (split.length > 1) {
      summary = split[0].trim();
      feedback = split.slice(1).join(' ').trim();
    }
    res.json({ summary, feedback });
  } catch (error) {
    console.error('Mistral summary error:', error.response?.data || error.message);
    res.status(500).json({ summary: '', feedback: '', error: 'Failed to get summary from Mistral' });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
