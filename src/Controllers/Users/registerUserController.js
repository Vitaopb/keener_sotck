import bcrypt from 'bcrypt';
import { prisma } from '../../Database/database';

export class RegisterUserController {

  async register(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body;
    
      // Validations
      if(!name || !email || !password || !confirmpassword) {
        return res.status(422).json({
          message: 'All fields are required'
        })
      }
    
      if(password !== confirmpassword) {
        return res.status(422).json({
          message: 'Passwords do not match'
        })
      }
    
      // Check if user already exists
      let user = await prisma.user.findUnique({ where: { email } });
      if(user) {
        return res.status(422).json({
          message: 'User already exists'
        })
      }
    
      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
    
      // Create user
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });
    
      res.status(201).json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }
}
