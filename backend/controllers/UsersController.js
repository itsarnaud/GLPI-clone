const { RegistrationSchema } = require('../schemas/user.schema');
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const fs     = require('fs');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');

module.exports.signup = async (req, res) => {
  try {
    const data = RegistrationSchema.parse(req.body);
    if (data.error?.issues) {
      return res.status(401).json({ err: data.error.issues });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;
  
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(401).json({ err: 'Cet email est déjà utilisé.' });
    }

    const user  = await prisma.user.create({ data });
    const token = jwt.sign({ user_id: user.id }, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Erreur interne.' })
  }
}

module.exports.login = (req, res) => {
  res.status(200).json({ msg: 'user login, return jwt for session' })
}

module.exports.create = (req, res) => {
  res.status(200).json({ msg: 'user creation by an admin, return true/false' })
}

module.exports.list = (req, res) => {
  res.status(200).json({ msg: 'list all users, only for admin' })
}

module.exports.show = (req, res) => {
  res.status(200).json({ msg: 'get information from an user, for auth user or admin' })
}

module.exports.destroy = (req, res) => {
  res.status(200).json({ msg: 'delete an user, only for admin' })
}

module.exports.update = (req, res) => {
  res.status(200).json({ msg: 'update user information, for auth user and admin' })
}


