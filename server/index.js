const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT ;

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Error in Database connection", err);
  });


app.listen(PORT, () => {
console.log(`Server running on port number ${PORT}`);
});
