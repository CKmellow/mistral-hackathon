require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/mistral', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for community onboarding.' },
          ...messages
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
    res.json({ reply: message });
  } catch (error) {
    console.error('Mistral error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Mistral' });
  }
});

app.post('/api/start-interview', async (req, res) => {
  try {
    const systemPrompt = `
You are Mistro, a friendly AI community builder for Ubuntu Connect. Your role is to conduct warm, conversational interviews with new community members to understand their skills, needs, and how they can contribute to neighborhood resilience.

CONVERSATION STYLE:
Warm, friendly, and curious (not interrogating).
Ask follow-up questions based on their responses.
Keep it conversational, not like a form.

Start with:
"Hi there! I'm Mistro, and I'm here to help you connect with your neighbors in meaningful ways. Let's start with something fun – what's one thing you're pretty good at that might surprise people?"
    `;

    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Start the interview.' }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const initialPrompt = response.data.choices[0].message.content;
    res.json({ initialPrompt });
  } catch (err) {
    console.error("Error starting interview:", err.response?.data || err.message);
    res.status(500).json({ error: 'Could not initiate interview' });
  }
});

app.post('/api/mistral-summary', async (req, res) => {
  const { skills, support, languages, medical } = req.body;

  try {
    const prompt = `Here are my answers for a community mutual aid interview:
Skills: ${skills}
Support: ${support}
Languages: ${languages}
Medical: ${medical}

Please provide a friendly summary and then brief encouragement.`;

    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'system', content: 'You are a helpful, community-focused assistant.' },
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
    const split = content.split(/Feedback:|Encouragement:|\n\n/);
    const summary = split[0].trim();
    const feedback = split.slice(1).join(' ').trim();

    res.json({ summary, feedback });
  } catch (error) {
    console.error('Mistral summary error:', error.response?.data || error.message);
    res.status(500).json({ summary: '', feedback: '', error: 'Failed to get summary' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const axios = require('axios');

// const app = express();
// const port = 5000;

// app.use(cors({ origin: true, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.post('/api/mistral', async (req, res) => {
//   const { messages } = req.body;

//   try {
//     const response = await axios.post(
//       'https://api.mistral.ai/v1/chat/completions',
//       {
//         model: 'mistral-small',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant for community onboarding.' },
//           ...messages
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const message = response.data.choices[0].message.content;
//     res.json({ reply: message });
//   } catch (error) {
//     console.error('Mistral error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to get response from Mistral' });
//   }
// });

// app.post('/api/start-interview', async (req, res) => {
//   try {
//     const systemPrompt = `
// You are Mistro, a friendly AI community builder for Ubuntu Connect. Your role is to conduct warm, conversational interviews with new community members to understand their skills, needs, and how they can contribute to neighborhood resilience.

// CONVERSATION STYLE:
// Warm, friendly, and curious (not interrogating).
// Ask follow-up questions based on their responses.
// Keep it conversational, not like a form.

// Start with:
// "Hi there! I'm Mistro, and I'm here to help you connect with your neighbors in meaningful ways. Let's start with something fun – what's one thing you're pretty good at that might surprise people?"
//     `;

//     const response = await axios.post(
//       'https://api.mistral.ai/v1/chat/completions',
//       {
//         model: 'mistral-small',
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: 'Start the interview.' }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const initialPrompt = response.data.choices[0].message.content;
//     res.json({ initialPrompt });
//   } catch (err) {
//     console.error("Error starting interview:", err.response?.data || err.message);
//     res.status(500).json({ error: 'Could not initiate interview' });
//   }
// });

// app.post('/api/mistral-summary', async (req, res) => {
//   const { skills, support, languages, medical } = req.body;

//   try {
//     const prompt = `Here are my answers for a community mutual aid interview:
// Skills: ${skills}
// Support: ${support}
// Languages: ${languages}
// Medical: ${medical}

// Please provide a friendly summary and then brief encouragement.`;

//     const response = await axios.post(
//       'https://api.mistral.ai/v1/chat/completions',
//       {
//         model: 'mistral-small',
//         messages: [
//           { role: 'system', content: 'You are a helpful, community-focused assistant.' },
//           { role: 'user', content: prompt }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const content = response.data.choices[0].message.content;
//     const split = content.split(/Feedback:|Encouragement:|\n\n/);
//     const summary = split[0].trim();
//     const feedback = split.slice(1).join(' ').trim();

//     res.json({ summary, feedback });
//   } catch (error) {
//     console.error('Mistral summary error:', error.response?.data || error.message);
//     res.status(500).json({ summary: '', feedback: '', error: 'Failed to get summary' });
//   }
// });app.post('/api/start-interview', async (req, res) => {
//   try {
//     const systemPrompt = `
// You are Mistro, a friendly AI community builder for Ubuntu Connect...

// (Insert your friendly onboarding instructions here. Don't repeat them as user content.)
//     `;

//     const response = await axios.post(
//       'https://api.mistral.ai/v1/chat/completions',
//       {
//         model: 'mistral-small',
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: 'Start the interview.' }
//         ]
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const initialPrompt = response.data.choices[0].message.content;
//     res.json({ initialPrompt });
//   } catch (err) {
//     console.error("Error starting interview:", err.response?.data || err.message);
//     res.status(500).json({ error: 'Could not initiate interview' });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

