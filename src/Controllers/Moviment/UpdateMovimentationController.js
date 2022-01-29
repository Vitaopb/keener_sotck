import { prisma } from "../../database";

export class UpdateMovimentController {
  async handle(req, res) {
    try {
      const { userId, serialNumber } = req.params;
      const { type, price, quantity, productId } = req.body;
      
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
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

      if(!product || !user) {
        const missedArgument = !product ? 'product not found' : 'user not found';
        return res.status(404).json({ message: missedArgument });
      }

      const moviment = await prisma.movimentation.update({
        where: { serialNumber: Number(serialNumber) },
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