import { prisma } from "../../database";

export class ListAllProductMovimentationController {
  async handle(req, res) {
    try {
      const { userId, productId } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

      if (!product || !user) {
        const missedArgument = !product ? 'product not found' : 'user not found';
        return res.status(404).json({ message: missedArgument });
      }

      const moviments = await prisma.movimentation.findMany({
        where: { userId: user.id, productId: product.id },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });

      if (!moviments) {
        return res.status(404).json({ message: 'movimentation not found' });
      }

      return res.status(200).json(moviments); 
    } catch (error) {
      console.log(error);
    }
  }
}