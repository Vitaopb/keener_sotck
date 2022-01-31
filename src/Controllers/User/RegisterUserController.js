import bcrypt from 'bcrypt';
import { prisma } from '../../database';

export class RegisterUserController {

  async handle(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body;
      let user = await prisma.user.findUnique({ where: { email } });
    
      if(!name || !email || !password || !confirmpassword) 
        return res.status(422).json({ message: 'All fields are required' });
    
      if(password !== confirmpassword) 
        return res.status(422).json({ message: 'Passwords do not match' });
    
      if(user) 
        return res.status(422).json({ message: 'User already exists' });
      
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
    
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });
    
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  }
}
