import { prisma } from  '../../Database/database';

export class ProductController {
  async create(req, res) {
   const { name, price, description, barcode } = req.body;
   const { id } = req.params;
 
   try {
     const user = await prisma.user.findUnique({ where: { id: Number(id) } });
 
     if (!user) 
       return res.status(404).json({ message: 'User not found' });
     
 
     let product = await prisma.product.findUnique({ where: { barcode } });
 
     if(product) 
       return res.status(400).json({ message: 'Product already exists' });
     
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
      const { barcode } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      const product = await prisma.product.findUnique({ 
        where: { barcode },
        include: { user: { select: { name: true } } }
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      else if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }  
      else if (product.userId !== user.id) {
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
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

  async delete(req, res) {
    const { id } = req.params;
    const { barcode } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      const product = await prisma.product.findUnique({ where: { barcode } });

      if (!product) 
        return res.status(404).json({ message: 'Product not found' });
      
      else if (!user) 
        return res.status(404).json({ message: 'User not found' });
      
      else if (product.userId !== user.id) 
        return res.status(401).json({ message: 'You are not authorized to access this product' });
      
      await prisma.product.delete({ where: { barcode } });
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.log(error);
    }
  }
}

