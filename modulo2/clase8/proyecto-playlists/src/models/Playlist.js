const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, maxlength: 200},
    canciones: [{type: String, required: true}],
    autor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    fechaCreacion: { type: Date, default: Date.now },
    votos: { type: Number, default: 0 },
    votantes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);