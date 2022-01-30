import { prisma } from '../../database';
import bcrypt from 'bcrypt'

export class UpdateUserController {
  async handle(req, res) {
     try {
       const { userId } = req.params;
       const { name, email, password, confirmpassword } = req.body;
       let user = await prisma.user.findUnique({ where: { id: Number(userId) } });

        if(!name || !email || !password || !confirmpassword) {
            return res.status(400).json({ error: 'fill in all fields' });
        }

        if(password !== confirmpassword) {
            return res.status(400).json({ error: 'passwords do not match' });
        }

        if(!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                name,
                email,
                password,
                confirmpassword: hashedPassword
            }
        });
        return res.status(200).json({ message: 'user updated', user });
     } catch (error) {
       console.log(error);
     }
  }
}