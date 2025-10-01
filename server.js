require('dotenv').config();

const express = require('express')
const cors = require('cors');
const  mongoose = require('mongoose');


const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/health', (_req, res) => {
  logger.info("health check ok");
  res.json({ ok: true });
});
app.use('/api/todos', todoRoutes);

const port = 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

//connect to db

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ DB connected');
  console.log('DB name:', mongoose.connection.name);
  console.log('URI host:', mongoose.connection.host, 'port:', mongoose.connection.port);
})
.catch((error) => console.log('DB connection error', error));

//start server    

app.listen(port, function(error){
  if(error){
    console.log('we got an error', error)
  } else {
    console.log(`server work properly on port ${port}`)
  }
});