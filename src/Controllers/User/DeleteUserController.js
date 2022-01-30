import { prisma } from '../../database';

export class DeleteUserController {
  async handle(req, res) {
    try {
      const { userId } = req.params;
      let user = await prisma.user.findUnique({ where: { id: Number(userId) } });

      if(!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      user = await prisma.user.delete({ where: { id: Number(userId) } });
      return res.status(200).json({ message: 'user deleted', user });
    } catch (error) {
      console.log(error);
    }
  }
}