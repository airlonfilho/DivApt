const axios = require('axios');
const Usuario = require('../models/Usuario');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedUsuario = await Usuario.findById(user);

    const users = await Usuario.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUsuario.likes } },
        { _id: { $nin: loggedUsuario.dislikes } },
      ],
    })

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Usuario.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const usuario = await Usuario.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(usuario);
  }
};
