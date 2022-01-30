import { prisma } from  '../../database';

export class UpdateProductController {
  async handle(req, res) {
    
    try {
      const { userId } = req.params;
      const { barcode } = req.params;
      const { name, price, description } = req.body;
      let product = await prisma.product.findUnique({ where: { barcode } });
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

      if (!name || !price || !description) {
        return res.status(400).json({ message: 'Please fill all the fields' });
      }

      if(!product || !user) {
        const missedArgument = !product ? 'product not found' : 'user not found';
        return res.status(404).json({ message: missedArgument });
      }
      
      if (product.userId !== user.id) {
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      }
      
      product = await prisma.product.update({
        where: { barcode },
        data: {
          name,
          price,
          description
        }, 
        include: { user: { select: { name: true } } }
      });
      console.log(product);
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}