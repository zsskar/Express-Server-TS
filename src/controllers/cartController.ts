import { RequestHandler } from "express";
import { cartSchema } from "../schemas";
import prisma from '../db';

export const addProductToCart : RequestHandler = async (req, res) => {
    try {
        const requestBody = cartSchema.parse(req.body);
        const cartProduct = await prisma.cart.create({ data: requestBody });
        res.status(201).json(cartProduct);  
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }         
    }
};

export const getCartProductByIdAndUser : RequestHandler = async (req, res) => {
    try {
        const {id, userId} = req.params;
        const existingCartProduct = await prisma.cart.findUnique({ where: { id: Number(id), userId: Number(userId) } });
        if(!existingCartProduct) {
            res.status(404).json({ message : `Cart product not found with ID ${id} for user ${userId}` });
        }
        res.json(existingCartProduct);
        
    } catch (error) {
        if (!res.headersSent) {
        if(error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }     
    }   
    }
};

export const getCartProductsByUser : RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const existingCartProduct = await prisma.cart.findMany({ where: { userId: Number(userId) } });
        if(!existingCartProduct) {
            res.status(404).json({ message : `Cart products not found for user ${userId}` });
        }
        res.json(existingCartProduct);
        
    } catch (error) {
        if (!res.headersSent) {
        if(error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }  
    }      
    }
};

export const deleteCartProductByIdAndUser : RequestHandler = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const existingCartProduct = await prisma.cart.deleteMany({ where: { id : Number(id), userId: Number(userId) } });
        if(!existingCartProduct) {
            res.status(404).json({ message : `No cart products found with ID ${id} for User ${userId}` });
        }
        await prisma.cart.deleteMany({ where: { id : Number(id), userId: Number(userId) } })
        res.json({ message : `Cart products with ID ${id} for User ${userId} deleted` });

    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }        
    }
};

export const deleteAllCartProductsByUser : RequestHandler = async (req, res) => {
 try {
        const { userId } = req.params;
        const existingCartProduct = await prisma.cart.deleteMany({ where: { userId: Number(userId) } });
        if(!existingCartProduct) {
            res.status(404).json({ message : `No cart products found for User ${userId}` });
        }
        await prisma.cart.deleteMany({ where: { userId: Number(userId) } })
        res.json({ message : `Cart products for User ${userId} deleted` });
        
    } catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }        
    }
};