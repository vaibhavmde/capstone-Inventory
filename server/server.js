require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");


const app = express();
const PORT = process.env.PORT || 5000;

//connect to mongodb
connectDB();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
//to parse json
app.use(express.json());


// routes
app.use('/api/auth',require('./routes/auth'));
app.use('/user',require('./routes/user'));
app.use('/product',require('./routes/product'));
app.use('/orders',require('./routes/order'));
app.use('/cart',require('./routes/cart'));


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

