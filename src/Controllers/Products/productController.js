import { prisma } from  '../../Database/database';

export class ProductController {
  async create(req, res) {
   const { name, price, description, barcode } = req.body;
   const { id } = req.params;
 
   try {
     const user = await prisma.user.findUnique({ where: { id: Number(id) } });
 
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     let product = await prisma.product.findUnique({ where: { barcode } });
 
     if(product) {
       return res.status(400).json({ message: 'Product already exists' });
     }
     console.table(req.body);
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

  async listAll(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

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

  async listOne(req, res) {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
}

