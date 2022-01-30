import { prisma } from "../../database";

export class ListOneMovementsController {
  async handle(req, res) {
    try {
      const { serialNumber, userId } = req.params;
      let moviment = await prisma.movimentation.findUnique({ where: { serialNumber } });
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

      if(!user || !moviment) {
        const missedArgument = !user ? 'user not found' : 'moviment not found';
        return res.status(404).json({ message: missedArgument });
      }

      moviment = await prisma.movimentation.findUnique({
        where: { serialNumber },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });
      // if(!moviment) {
      //   return res.status(404).json({ message: 'moviment not found' });
      // }

      return res.status(200).json(moviment);
    } catch (error) { 
      console.log(error);
    }
  }
}