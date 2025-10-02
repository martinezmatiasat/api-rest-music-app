const { Schema, model } = require('mongoose');

const albumSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    default: 'default.jpg' 
  },
  artist: { 
    type: Schema.Types.ObjectId, 
    ref: 'Artist', 
    required: true 
  },
  songs: [
    {
      type: Schema.Types.ObjectId, 
      ref: 'Song'
    }
  ]
});

module.exports = model('Album', albumSchema);