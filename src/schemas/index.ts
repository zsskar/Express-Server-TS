import { z } from "zod";

/**
 * User schema
 */

export const userSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  profile: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Product schema
 */

export const productSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(1),
    description: z.string().min(1),
    quantity: z.number().int().nonnegative(),
    colors: z.array(z.string()).optional(),
    price: z.number().nonnegative(),
    discount: z.number().nonnegative().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });
  
  export const createProductSchema = productSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });


  /**
   * Purchase schema
   */

  export const purchaseSchema = z.object({
    id: z.number().int().positive().optional(),
    userId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    createdAt: z.date().optional(),
  });
  
  export const createPurchaseSchema = purchaseSchema.omit({
    id: true,
    createdAt: true,
  });