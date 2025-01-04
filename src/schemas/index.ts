import { z } from "zod";

/**
 * User schema
 */

export const createUserSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  profile: z.string().optional(),
  purchases: z.array(z.number().int().positive()).optional(),
  cart : z.array(z.number().int().positive()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
 
});

export const userSchema = createUserSchema.omit({
  id: true,
  purchases: true,
  cart: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Product schema
 */

export const createProductSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1),
    description: z.string().min(1),
    quantity: z.number().int().nonnegative(),
    colors: z.string().optional(),
    price: z.number().nonnegative(),
    discount: z.number().nonnegative().optional().default(0),
    purchases: z.array(z.number().int().positive()).optional(),
    cart : z.array(z.number().int().positive()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

  export const productSchema = createProductSchema.omit({
    id: true,
    purchases: true,
    cart: true,
    createdAt: true,
    updatedAt: true,
  });


  /**
   * Purchase schema
   */

  export const createPurchaseSchema = z.object({
    id: z.number().int().positive().optional(),
    userId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    purchaseAt: z.date().optional(),
  });
  
  export const purchaseSchema = createPurchaseSchema.omit({
    id: true,
    purchaseAt: true,
  });