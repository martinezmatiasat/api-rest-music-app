const Song = require('@/models/Song');
const { validateSong } = require('@/helpers/validate');

// Get
const test = (req, res) => {
  res.json({ message: "¡Ruta de prueba de cancion funcionando!" });
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    return res.status(200).json({ message: 'Canciones obtenidas exitosamente.', result: songs });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const songId = req.params.id;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Canción no encontrada.' });
    }

    return res.status(200).json({ message: 'Canción obtenida exitosamente.', result: song });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Post
const createSong = async (req, res) => {
  try {
    const songData = req.body;

    const validation = validateSong(songData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const song = new Song(songData);
    await song.save();

    return res.status(201).json({ message: 'Canción creada exitosamente.', result: song });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Patch
const updateSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const updateData = req.body;

    const song = await Song.findByIdAndUpdate(songId, updateData, { new: true });
    if (!song) {
      return res.status(404).json({ message: 'Canción no encontrada.' });
    }

    return res.status(200).json({ message: 'Canción actualizada exitosamente.', result: song });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Delete
const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;
    
    const song = await Song.findByIdAndDelete(songId);
    if (!song) {
      return res.status(404).json({ message: 'Canción no encontrada.' });
    }

    return res.status(200).json({ message: 'Canción eliminada exitosamente.', result: song });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

module.exports = {
  test,
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong
};