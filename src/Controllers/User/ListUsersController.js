import { prisma } from '../../database';

export class ListUsersController {
  async handle(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  }
}