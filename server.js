require('dotenv').config();

const express = require('express')
const cors = require('cors');
const  mongoose = require('mongoose');


const app = express();

app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todoRoutes');
app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ DB connected');
    console.log('DB name:', mongoose.connection.name);
    console.log('URI host:', mongoose.connection.host, 'port:', mongoose.connection.port);
})
.catch((error) => console.log('DB connection error', error));

const port = 3000;

app.listen(port, function(error){
  if(error){
    console.log('we got an error', error)
  } else {
    console.log(`server work properly on port ${port}`)
  }
});

