import jwt from 'jsonwebtoken';

export class AuthToken {
  
  checkToken(req, res, next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
 
   if(!token) {
     return res.status(401).json({ message: 'Access denied. No token provided.' });
   }
 
   try {
     jwt.verify(token, process.env.JWT_SECRET);
     next();
 
   } catch (error) {
     return res.status(403).json({ message: 'Access denied. Invalid token.' });
   }
 }
}