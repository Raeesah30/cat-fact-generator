require('dotenv').config()
const express = require('express');
const app = express();
const { Groq } = require('groq-sdk')

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Cat fact route
app.get('/cat-fact', async (req, res) => {
// Calls groq
const completion = await groq.chat.completions.create({
messages: [{
role: 'user',
content: 'Tell about an short cat fact. No need for a long essay maximum 1 sentence and make it interesting'
}],
model: 'llama-3.3-70b-versatile'
})
// Display fact 
const catFact = completion.choices[0].message.content
res.json({fact : catFact})
})

app.listen(3001, () => {
console.log('Server running on port 3001')
console.log('Test the endpoint here: http://localhost:3001/cat-fact')
})