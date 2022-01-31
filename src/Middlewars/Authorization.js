import jwt from 'jsonwebtoken';

export class Authorization {
  check(req, res, next) {
    const authHeader = req.headers['authorization'],
          token = authHeader && authHeader.split(' ')[1];

    if(!token) 
      return res.status(401).json({ error: 'No token provided' });

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
  }
}