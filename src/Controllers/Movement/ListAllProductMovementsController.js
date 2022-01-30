import { prisma } from '../../database';

export class ListAllProductMovementsController {
  async handle(req, res) {
    try {
      const { userId, productId } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      const product = await prisma.product.findUnique({ where: { id: Number(productId) } });

      const moviments = await prisma.movimentation.findMany({
        where: { userId: user.id, productId: product.id },
        include: {
          product: { select: { name: true } },
          user: { select: { name: true } }
        }
      });
      
      if(!product || !user || !moviments) {
        const missedArgument = !product ? 'product not found' : 'user not found' || !moviment ? 'moviment not found' : 'moviment not found';
        return res.status(404).json({ message: missedArgument });
      }
      

      return res.status(200).json(moviments); 
    } catch (error) {
      console.log(error);
    }
  }
}