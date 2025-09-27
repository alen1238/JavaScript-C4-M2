const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  votePlaylist,
  getRanking
} = require("../controllers/playlistController");

const router = express.Router();

router.get("/", getPlaylists);
router.get("/:id", getPlaylistById);
router.get("/ranking/top", getRanking);

router.post("/", protect, createPlaylist);
router.put("/:id", protect, updatePlaylist);
router.delete("/:id", protect, deletePlaylist);
router.post("/:id/vote", protect, votePlaylist);

module.exports = router;
