const { RegistrationSchema, LoginSchema } = require('../schemas/user.schema');
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const fs     = require('fs');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');

module.exports.signup = async (req, res) => {
  try {
    const parsed = RegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ err: parsed.error.issues });
    }
    const data = parsed.data;

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

module.exports.login = async (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ err: parsed.error.issues });
    }
    const data = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (!existing) {
      return res.status(401).json({ err: 'Identifiant ou mot de passe incorrect.' })
    }

    const match = await bcrypt.compare(data.password, existing.password);
    if (!match) {
      return res.status(401).json({ err: 'Identifiant ou mot de passe incorrect.' })
    }

    const token = jwt.sign({ user_id: existing.id }, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: 'Erreur interne.' })
  }
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


