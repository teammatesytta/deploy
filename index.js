const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from EC2! I Did it!'));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));