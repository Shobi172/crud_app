require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require("mongoose");
require("./db/connection");

const cors = require('cors');

const router = require("./routes/router");

app.use(cors()); 
app.use(express.json());

app.use(router);

const PORT = 5000; 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
