const { Router } = require('express');
const artistController = require('@/controllers/artistController.js');
const upload = require('@/helpers/upload.js');
const router = Router();

// Get
router.get("/test", artistController.test);
router.get("/", artistController.getArtists);
router.get("/:id", artistController.getArtistById);

// Post
router.post("/", upload.single('image'), artistController.createArtist);

// Patch
router.patch("/:id", upload.single('image'), artistController.updateArtist);

// Delete
router.delete("/:id", artistController.deleteArtist);

module.exports = router;