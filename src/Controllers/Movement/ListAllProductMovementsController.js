import { prisma } from '../../database';

export class ListAllProductMovementsController {
  async handle(req, res) {
    try {
      const { userId, productId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

      const movements = await prisma.movement.findMany({
        where: { userId: user.id, productId: product.id },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });
      
      if(!product || !user || !movements) {
        const missedArgument = !product ? 'product not found' : 'user not found' || !movement ? 'movement not found' : 'movement not found';
        return res.status(404).json({ message: missedArgument });
      }
      
      return res.status(200).json(movements); 
    } catch (error) {
      console.log(error);
    }
  }
}