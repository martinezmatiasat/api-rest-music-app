const { Router } = require('express');
const songController = require('@/controllers/songController.js');
const upload = require('@/helpers/upload.js');
const router = Router();

// Get
router.get("/test", songController.test);
router.get("/", songController.getSongs);
router.get("/:id", songController.getSongById);
router.get("/artist/:artistId", songController.getSongsByArtist);

// Post
router.post("/", upload.single('audio'), songController.createSong);

// Patch
router.patch("/:id", upload.single('audio'), songController.updateSong);

// Delete
router.delete("/:id", songController.deleteSong);

module.exports = router;