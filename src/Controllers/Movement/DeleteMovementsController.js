import { prisma } from "../../database";

export class DeleteMovementsController {
  async handle(req, res) {
    try {
      const { userId, serialNumber } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      let moviment = await prisma.movimentation.findUnique({ where: { serialNumber } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (moviment.userId !== user.id) {
        return res.status(401).json({ message: 'You are not authorized to access this moviment' });
      }
      
      if (!moviment || moviment === null) {
        return res.status(404).json({ message: 'Moviment not found' });
      }

      moviment = await prisma.movimentation.delete({ where: { serialNumber } });

      return res.status(200).json({ message: 'Moviment deleted', moviment });
    } catch (error) {
      console.log(error);
    }
  }
}