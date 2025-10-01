require('dotenv').config();

const express = require('express')
const cors = require('cors');
const  mongoose = require('mongoose');
const logger = require('./logger');
const todoRoutes = require('./routes/todoRoutes');
const { log } = require('winston');

const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  logger.info('Health check endpoint hit');
  res.status(200).json({ status: 'ok' });
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', {
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack
  });
  res.status(500).json({ message: 'Internal Server Error' });
});

//connect to db
async function start()  {
  try { 
  await mongoose.connect(MONGODB_URI);
  logger.info('Connecting to DB', {
    DB: mongoose.connection.name,
    host: mongoose.connection.host,
    port: mongoose.connection.port
  });
  
  app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
  } catch (error) {
    logger.error('Error connecting to DB:', error);
    process.exit(1);
  }
}

start();

mongoose.connection.on('disconnected', () => logger.warn('⚠️ DB disconnected'));
mongoose.connection.on('reconnected', () => logger.info('🔁 DB reconnected'));


