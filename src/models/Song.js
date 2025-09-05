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
  album: { 
    type: Schema.Types.ObjectId, 
    ref: 'Album', 
    required: true 
  },
  file: { 
    type: String, 
    required: true 
  },
  trackNumber: { 
    type: Number, 
    required: true 
  }
});

module.exports = model('Song', songSchema);