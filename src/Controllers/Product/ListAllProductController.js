import { prisma } from  '../../database';

export class ListAllProductController {
  async handle(req, res) {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

      if (!user) 
        return res.status(404).json({ message: 'User not found' });

      const products = await prisma.product.findMany({
        where: { userId: user.id },
        include: {
          user: {
            select: {
              name: true,
            }
          }
        }
      });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  }
}