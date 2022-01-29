import { prisma } from "../../database";

export class ListOneMovimentationController {
  async handle(req, res) {
    try {
      const { serialNumber, userId } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if(!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      const moviment = await prisma.movimentation.findUnique({
        where: { serialNumber: Number(serialNumber) },
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