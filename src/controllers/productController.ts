import { RequestHandler } from 'express';
import { productSchema } from '../schemas';
import prisma from '../db';
import redisClient from '../redis/redisClient';

const PRODUCTS_CACHE_KEY = 'products';

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = productSchema.parse(req.body);
    const newProduct = await prisma.product.create({ data: requestBody });

    // Invalidate cache after creating a new product
    await redisClient.del(PRODUCTS_CACHE_KEY);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });

    // Invalidate cache after updating a product
    await redisClient.del(PRODUCTS_CACHE_KEY);

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    console.log('Limit: ' + limit + ' and offset: ' + offset);

    const limitValue = limit !== undefined ? Number(limit) : undefined;
    const offsetValue =
      offset !== undefined && offset !== null ? Number(offset) : undefined;

    // Check if products are cached
    const cachedProducts = await redisClient.get(PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      console.log('Serving from Redis cache');
      const parsedProducts = JSON.parse(cachedProducts);

      // Apply pagination on cached products (if required)
      const paginatedProducts = parsedProducts.slice(
        offsetValue || 0,
        limitValue ? (offsetValue || 0) + limitValue : undefined,
      );

      res.json({
        success: true,
        data: paginatedProducts,
        paginationInfo: {
          limit: limitValue !== undefined ? limitValue : null,
          offset: offsetValue !== undefined ? offsetValue : null,
        },
      });
      return;
    }

    // If not cached, fetch from DB
    console.log('Fetching from database');
    const products = await prisma.product.findMany({
      take: limitValue,
      skip: offsetValue,
      include: {
        purchase: true,
        cart: true,
        Wishlist: true,
      },
    });

    if (!products || products.length === 0) {
      res.status(404).json({ error: 'No products found' });
      return;
    }

    // Cache products for subsequent requests
    await redisClient.set(
      PRODUCTS_CACHE_KEY,
      JSON.stringify(products),
      'EX',
      3600,
    ); // Cache for 1 hour

    res.json({
      success: true,
      data: products,
      paginationInfo: {
        limit: limitValue !== undefined ? limitValue : null,
        offset: offsetValue !== undefined ? offsetValue : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if individual product is cached
    const cachedProduct = await redisClient.get(`product:${id}`);
    if (cachedProduct) {
      console.log('Serving product from Redis cache');
      res.json(JSON.parse(cachedProduct));
      return;
    }

    // If not cached, fetch from DB
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        purchase: true,
        cart: true,
        Wishlist: true,
      },
    });

    if (!product) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }

    // Cache the product
    await redisClient.set(`product:${id}`, JSON.stringify(product), 'EX', 3600); // Cache for 1 hour

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    // Invalidate cache for products and the deleted product
    await redisClient.del(PRODUCTS_CACHE_KEY);
    await redisClient.del(`product:${id}`);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteAllProducts: RequestHandler = async (req, res, next) => {
  try {
    await prisma.product.deleteMany({});

    // Invalidate all caches
    await redisClient.del(PRODUCTS_CACHE_KEY);

    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    next(error);
  }
};
