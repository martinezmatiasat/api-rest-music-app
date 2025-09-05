const { Router } = require('express');
const albumController = require('@/controllers/albumController.js');
const upload = require('@/helpers/upload.js');
const router = Router();

// Get
router.get("/test", albumController.test);
router.get("/", albumController.getAlbums);
router.get("/:id", albumController.getAlbumById);

// Post
router.post("/", upload.single('image'), albumController.createAlbum);

// Patch
router.patch("/:id", upload.single('image'), albumController.updateAlbum);

// Delete
router.delete("/:id", albumController.deleteAlbum);

module.exports = router;