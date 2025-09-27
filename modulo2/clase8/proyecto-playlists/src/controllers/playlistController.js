const Playlist = require("../models/Playlist");

// Crear playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { titulo, descripcion, canciones } = req.body;

    const playlist = await Playlist.create({
      titulo,
      descripcion,
      canciones,
      autor: req.user._id
    });

    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar playlists
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("autor", "username");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener playlist por ID
exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("autor", "username");
    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar playlist propia
exports.updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.autor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No puedes editar esta playlist" });
    }

    Object.assign(playlist, req.body);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar playlist propia
exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });
    if (playlist.autor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No puedes eliminar esta playlist" });
    }

    await playlist.deleteOne();
    res.json({ message: "Playlist eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Votar por una playlist
exports.votePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist no encontrada" });

    if (playlist.votantes.includes(req.user._id)) {
      return res.status(400).json({ message: "Ya votaste esta playlist" });
    }

    playlist.votos += 1;
    playlist.votantes.push(req.user._id);
    await playlist.save();

    res.json({ message: "Voto registrado", votos: playlist.votos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ranking de playlists
exports.getRanking = async (req, res) => {
  try {
    const ranking = await Playlist.find()
      .sort({ votos: -1 })
      .limit(10)
      .populate("autor", "username");

    res.json(ranking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
