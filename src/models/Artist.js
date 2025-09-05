const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    default: 'default.jpg' 
  },
  albums: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Album' 
    }
  ]
});

module.exports = model('Artist', artistSchema);