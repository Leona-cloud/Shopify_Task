const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const raw = require('./routes/raw-materials');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/raw', raw);


mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.error("unable to connect", err));



const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})

