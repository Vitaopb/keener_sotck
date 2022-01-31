import { prisma } from '../../database';

export class DeleteMovementsController {
  async handle(req, res) {
    try {
      const { userId, serialNumber } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      let movement = await prisma.movement.findUnique({ where: { serialNumber } });

      if (!user || !movement) {
        const missedArgument = !user ? 'user not found' : 'movement not found';
        return res.status(404).json({ message: missedArgument });
      }

      if (movement.userId !== user.id) 
        return res.status(401).json({ message: 'You are not authorized to access this movement' });
      
      movement = await prisma.movement.delete({ where: { serialNumber } });

      return res.status(200).json({ message: 'Movement deleted', movement });
    } catch (error) {
      console.log(error);
    }
  }
}