const Usuario = require('../models/Usuario');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { usuarioId } = req.params;

    const loggedUsuario = await Usuario.findById(user);
    let targetUsuario = null

    try {
      targetUsuario = await Usuario.findById(usuarioId);
    } catch (error) {
      return res.status(400).json({ error: 'Usuario not exists' });
    }
    

    loggedUsuario.dislikes.push(targetUsuario._id);

    await loggedUsuario.save();

    return res.json(loggedUsuario);
  }
};