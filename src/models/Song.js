const { Schema, model } = require('mongoose');

const songSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  year: { 
    type: Number, 
    required: true 
  },
  audio: { 
    type: String, 
    required: true 
  },
  artist: { 
    type: Schema.Types.ObjectId, 
    ref: 'Artist', 
    required: true 
  }
});

module.exports = model('Song', songSchema);