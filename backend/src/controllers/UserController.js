const axios = require('axios');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedUser = await User.findById(user);

    const users = await User.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } },
      ],
    })

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExists = await User.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    const user = await User.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(user);
  }
};
