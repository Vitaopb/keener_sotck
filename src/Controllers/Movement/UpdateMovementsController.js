import { prisma } from "../../database";

export class UpdateMovementController {
  async handle(req, res) {
    try {
      const { userId, serialNumber } = req.params;
      const { type, price, quantity, productId } = req.body;
      
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      let moviment = await prisma.movimentation.findUnique({ where: { serialNumber } });
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

      if(!type || !price || !quantity || !productId) {
        return res.status(400).json({ error: 'fill in all fields' });
      }

      if(!['entry', 'exit'].includes(type)) {
        return res.status(400).json({
           error: 'Invalid type',
           type: 'entry or exit'
        });
      }

      if(!product || !user || !moviment) {
        const missedArgument = !product ? 'product not found' : 'user not found' || !moviment ? 'moviment not found' : 'moviment not found';
        return res.status(404).json({ message: missedArgument });
      }

      moviment = await prisma.movimentation.update({
        where: { serialNumber },
        data: {
          type,
          price,
          quantity,
          productId: product.id,
          userId: user.id
        },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });
      return res.status(200).json({ message: 'moviment updated', moviment });
    } catch (error) {
      console.log(error);
    }
  }
}