const express = require('express');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/playlists', playlistRoutes);

module.exports = app;