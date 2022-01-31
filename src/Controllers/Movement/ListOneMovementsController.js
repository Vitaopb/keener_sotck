import { prisma } from '../../database';

export class ListOneMovementsController {
  async handle(req, res) {
    try {
      const { serialNumber, userId } = req.params;
      let movement = await prisma.movement.findUnique({ where: { serialNumber } });
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

      if(!user || !movement) {
        const missedArgument = !user ? 'user not found' : 'movement not found';
        return res.status(404).json({ message: missedArgument });
      }

      if(!movement) 
        return res.status(404).json({ message: 'movement not found' });
      
      if(movement.userId !== user.id)
        return res.status(401).json({ message: 'You are not authorized to access this movement' });
      
      movement = await prisma.movement.findUnique({
        where: { serialNumber },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });

      return res.status(200).json(movement);
    } catch (error) { 
      console.log(error);
    }
  }
}