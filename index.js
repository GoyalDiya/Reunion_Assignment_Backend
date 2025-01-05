const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const taskRoute = require('./routes/task.route');

require('dotenv').config();

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error: ', err));

app.use(express.json()); 
app.use(cors());
app.use('/api', taskRoute);

app.get('/', (req, res) => {
  res.send('Hello from Express and MongoDB!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
