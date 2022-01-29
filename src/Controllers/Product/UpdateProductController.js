import { prisma } from  '../../database';

export class UpdateProductController {
  async handle(req, res) {
    const { id } = req.params;
    const { barcode } = req.params;
    const { name, price, description } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      const product = await prisma.product.findUnique({ where: { barcode } });

      if (!name || !price || !description) 
        return res.status(400).json({ message: 'Please fill all the fields' });

      if (!product) 
        return res.status(404).json({ message: 'Product not found' });
      
      else if (!user) 
        return res.status(404).json({ message: 'User not found' });
      
      else if (product.userId !== user.id) 
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      
      const updatedProduct = await prisma.product.update({
        where: { barcode },
        data: {
          name,
          price,
          description
        }, 
        include: { user: { select: { name: true } } }
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  }
}