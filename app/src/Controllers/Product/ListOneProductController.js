import { prisma } from  '../../database';


export class ListOneProductController {
  async handle(req, res) {
    try {
      const { userId } = req.params;
      const { barcode } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      const product = await prisma.product.findUnique({ 
        where: { barcode },
        include: { user: { select: { name: true } } }
      });

      if (!user || !product) {
        const missedArgument = !user ? 'user not found' : 'product not found';
        return res.status(404).json({ message: missedArgument });
      }
      
      if (product.userId !== user.id) 
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}