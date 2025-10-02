const Album = require('@/models/Album');
const { validateAlbum } = require('@/helpers/validate');
const deleteFile = require('@/helpers/deleteFile');

// Get
const test = (req, res) => {
  res.json({ message: "¡Ruta de prueba de album funcionando!" });
};

const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist').populate('songs');
    return res.status(200).json({ message: 'Álbumes obtenidos exitosamente.', result: albums });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const albumId = req.params.id;

    const album = await Album.findById(albumId).populate('artist').populate('songs');
    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' });
    }

    return res.status(200).json({ message: 'Álbum obtenido exitosamente.', result: album });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Post
const createAlbum = async (req, res) => {
  try {
    const albumData = {
      ...req.body,
      year: parseInt(req.body.year, 10),
      songs: JSON.parse(req.body.songs)
    };
    
    if (req.file) {
      albumData.image = req.file.filename;
    }

    const validation = validateAlbum(albumData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const album = new Album(albumData);
    await album.save();

    return res.status(201).json({ message: 'Álbum creado exitosamente.', result: album });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Patch
const updateAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;

    const updateData = { 
      ...req.body,
      year: parseInt(req.body.year, 10),
      songs: JSON.parse(req.body.songs)
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const validation = validateAlbum(updateData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' });
    }

    if (album.image && updateData.image) {
      deleteFile(album.image);
    }

    Object.assign(album, updateData);
    await album.save();

    return res.status(200).json({ message: 'Álbum actualizado exitosamente.', result: album });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Delete
const deleteAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' });
    }

    if (album.image) {
      deleteFile(album.image);
    }

    await album.remove();

    return res.status(200).json({ message: 'Álbum eliminado exitosamente.', result: album });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

module.exports = {
  test,
  getAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
};