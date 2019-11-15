const Usuario = require('../models/Usuario');

module.exports = {
  async store(req, res) {
    console.log(req.io, req.connectedUsers);

    const { user } = req.headers;
    const { usuarioId } = req.params;

    const loggedUsuario = await Usuario.findById(user);
    let targetUsuario = null

    try {
      targetUsuario = await Usuario.findById(usuarioId);
    } catch (error) {
      return res.status(400).json({ error: 'Usuario not exists' });
    }

    if (targetUsuario.likes.includes(loggedUsuario._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[usuarioId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetUsuario);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedUsuario);
      }
    }

    loggedUsuario.likes.push(targetUsuario._id);

    await loggedUsuario.save();

    return res.json(loggedUsuario);
  }
};