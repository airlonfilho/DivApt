const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  bio: String,
  avatar: {
    type: String,
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  }],
}, {
  timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);
