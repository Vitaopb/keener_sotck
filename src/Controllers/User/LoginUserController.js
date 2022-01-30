import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../database';

export class LoginUserController {

  async handle(req, res) {
    try {
      const { email, password } = req.body;
  
      if(!email || !password) {
        return res.status(422).json({ error: 'Missing email or password' });
      }
  
      const user = await prisma.user.findUnique({ where: { email } });
      if(!user) {
        return res.status(422).json({ error: 'User does not exist' });
      }
      else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
        
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.json({ message: 'Login successful', token });
        }
        else {
          return res.status(422).json({ error: 'Incorrect email or password' });
        }
      }
    } catch (error) {
      return res.json({ error });    
    }
  }
}
