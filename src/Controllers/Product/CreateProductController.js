import { prisma } from  '../../database';

export class CreateProductController {
  async handle(req, res) {
    
    try {
      const { userId } = req.params;
      const { name, price, description, barcode } = req.body;
      let product = await prisma.product.findUnique({ where: { barcode } });
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
  
      if(product) {
        return res.status(400).json({ message: 'Product already exists' });
      }
      
      product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          barcode,
          userId: user.id
          },
          include: {
            user: {
              select: {
                name: true,
              }
            }
          }
      });
      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}