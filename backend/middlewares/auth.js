const jwt = require('jsonwebtoken');
const fs  = require('fs');
const { prisma } = require('../lib/prisma');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');

module.exports.index = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ err: 'Token manquant ou invalide.' })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, privateKey, { algorithm: 'RS256' });
    const user    = await prisma.user.findUnique({
      where : { id: decoded.user_id }
    });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ err: 'Token invalide ou expiré.' })
  }
}

