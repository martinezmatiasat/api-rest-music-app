const Artist = require('@/models/Artist');
const { validateArtist } = require('@/helpers/validate');

// Get
const test = (req, res) => {
  res.json({ message: "¡Ruta de prueba de artista funcionando!" });
};

const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate('albums');
    return res.status(200).json({ message: 'Artistas obtenidos exitosamente.', result: artists });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

const getArtistById = async (req, res) => {
  try {
    const artistId = req.params.id;

    const artist = await Artist.findById(artistId).populate('albums');
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado.' });
    }

    return res.status(200).json({ message: 'Artista obtenido exitosamente.', result: artist });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Post
const createArtist = async (req, res) => {
  try {
    const artistData = req.body;
    if (req.file) {
      artistData.image = req.file.filename;
    }

    const validation = validateArtist(artistData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const artist = new Artist(artistData);
    await artist.save();

    return res.status(201).json({ message: 'Artista creado exitosamente.', result: artist });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Patch
const updateArtist = async (req, res) => {
  try {
    const artistId = req.params.id;
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const validation = validateArtist(updateData);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado.' });
    }

    if (artist.image && artist.image !== updateData.image) {
      fs.unlinkSync(path.join(__dirname, '../uploads', artist.image));
    }

    Object.assign(artist, updateData);
    await artist.save();

    return res.status(200).json({ message: 'Artista actualizado exitosamente.', result: artist });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

// Delete
const deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;

    const artist = await Artist.findByIdAndDelete(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artista no encontrado.' });
    }

    if (artist.image) {
      fs.unlinkSync(path.join(__dirname, '../uploads', artist.image));
    }

    return res.status(200).json({ message: 'Artista eliminado exitosamente.', result: artist });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la solicitud.', error: error.message });
  }
};

module.exports = {
  test,
  getArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist
};

/* 
[
  {
    "_id": "64f5a1c2e1b2a3d4e5f6a7b8",
    "name": "The Beatles",
    "description": "Banda británica de rock formada en Liverpool.",
    "image": "beatles.jpg",
    "albums": [
      {
        "_id": "64f5a1c2e1b2a3d4e5f6a7c1",
        "title": "Abbey Road",
        "year": 1969,
        "description": "Último álbum grabado por The Beatles.",
        "image": "abbeyroad.jpg"
      },
      {
        "_id": "64f5a1c2e1b2a3d4e5f6a7c2",
        "title": "Sgt. Pepper's Lonely Hearts Club Band",
        "year": 1967,
        "description": "Álbum icónico de The Beatles.",
        "image": "sgtpepper.jpg"
      }
    ]
  },
  {
    "_id": "64f5a1c2e1b2a3d4e5f6a7b9",
    "name": "Queen",
    "description": "Banda británica de rock formada en Londres.",
    "image": "queen.jpg",
    "albums": [
      {
        "_id": "64f5a1c2e1b2a3d4e5f6a7c3",
        "title": "A Night at the Opera",
        "year": 1975,
        "description": "Incluye el famoso tema Bohemian Rhapsody.",
        "image": "nightopera.jpg"
      }
    ]
  }
]
*/