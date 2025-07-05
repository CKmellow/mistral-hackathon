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


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
