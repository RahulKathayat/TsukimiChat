const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.EXPO_PUBLIC_PORT || 8000;

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
