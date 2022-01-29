import { prisma } from  '../../database';

export class DeleteProductController {
  async handle(req, res) {
    
    try {
      const { id } = req.params;
      const { barcode } = req.params;
      const product = await prisma.product.findUnique({ where: { barcode } });
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!product || !user) {
        const missedArgument = !product ? 'product not found' : 'user not found';
        return res.status(404).json({ message: missedArgument });
      }
      
      if (!user) 
        return res.status(404).json({ message: 'User not found' });
      
      if (product.userId !== user.id) 
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      
      await prisma.product.delete({ where: { barcode } });
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.log(error);
    }
  }
}