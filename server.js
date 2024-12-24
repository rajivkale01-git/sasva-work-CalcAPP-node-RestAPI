const express = require('express'); 
const bodyParser = require('body-parser'); 
const path = require('path'); 
 
const app = express(); 
const PORT = 3001; // Use a port other than 5000 
 
// Middleware to parse JSON bodies 
app.use(bodyParser.json()); 
 
// Serve the HTML page 
app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
}); 
 
// POST endpoint for calculations 
app.post('/calculate', (req, res) => { 
  const { num1, num2, operation } = req.body; 
 
  if (typeof num1 !== 'number' || typeof num2 !== 'number') { 
    console.error('Invalid input: num1 and num2 should be numbers'); 
    return res.status(400).json({ error: 'Invalid input: num1 and num2 should be numbers' }); 
  } 
 
  let result; 
  if (operation === 'add') { 
    result = num1 + num2; 
  } else if (operation === 'subtract') { 
    result = num1 - num2; 
  } else if (operation === 'multiply') { 
    result = num1 * num2; 
  } else if (operation === 'divide') { 
    if (num2 === 0) {
      console.error('Division by zero is not allowed');
      return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    result = num1 / num2; 
  } else { 
    console.error('Invalid operation: should be "add", "subtract", "multiply", or "divide"'); 
    return res.status(400).json({ error: 'Invalid operation: should be "add", "subtract", "multiply", or "divide"' }); 
  } 
 
  console.log(`Operation: ${operation}, Num1: ${num1}, Num2: ${num2}, Result: ${result}`); 
  res.json({ result }); 
}); 
 
// Start the server 
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});