const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  surname: { 
    type: String
  },
  nickname: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  image: { 
    type: String, 
    default: 'default.jpg' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = model('User', userSchema);