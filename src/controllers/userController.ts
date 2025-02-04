import { RequestHandler } from 'express';
import { userSchema } from '../schemas';
import prisma from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { getFileUrl, getProfilePicPath } from '../utils/paths';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = userSchema.parse(req.body);
    const salt = await bcrypt.genSalt(10);
    requestBody.password = await bcrypt.hash(requestBody.password, salt);
    const newUser = await prisma.user.create({ data: requestBody });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const requestBody = userSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { purchases: true, cart: true },
    });
    if (!existingUser) {
      res.status(404).json({ error: `User not found with ID ${userId}` });
      return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: requestBody,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, confirmOldPassword, newPassword } = req.body;

    // Validate request body
    if (!oldPassword || !confirmOldPassword || !newPassword) {
      res.status(400).json({ message: 'All password fields are required.' });
    }

    if (oldPassword !== confirmOldPassword) {
      res.status(400).json({
        message: 'Old password and confirm old password do not match.',
      });
    }

    if (oldPassword === newPassword) {
      res.status(400).json({
        message: 'Old and new passwords must not be the same.',
      });
    }

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Validate old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      res.status(403).json({ message: 'Old password is incorrect.' });
    }

    // Hash and update the new password
    const newEncryptedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: newEncryptedPassword },
    });

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const checkIsEmailExist: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required.' });
    }
    const IsEmailExist = await prisma.user.findUnique({
      where: { email: email },
    });
    if (IsEmailExist) {
      res
        .status(200)
        .json({ message: `This email ${email} is already exists.` });
    }
    res.status(404).json({ message: `Yuhu you can use this email ${email}.` });
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { purchases: true, cart: true, Wishlist: true },
    });
    if (!user) {
      res.status(404).json({ error: `User not found with ID ${userId}` });
      return;
    }
    if (user.profile) {
      res.json({ ...user, profile: getFileUrl(req, user.profile) });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUser = await prisma.user.findMany({
      include: { purchases: true, cart: true, Wishlist: true },
    });
    if (!allUser) {
      res.status(404).json({ error: 'No user found' });
    }
    const usersWithProfile = allUser.map((user) => ({
      ...user,
      profile: user.profile ? getFileUrl(req, user.profile) : null,
    }));
    res.json(usersWithProfile);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      res.status(404).json({ error: `User not found with ID ${userId}` });
      return;
    }
    await prisma.user.delete({ where: { id: Number(userId) } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteAllUsers: RequestHandler = async (_, res, next) => {
  try {
    prisma.user.deleteMany({});
    res.json({ message: 'All users deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '60m',
    });

    res.json({ message: 'Signin successfull', user: user, token: token });
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!existingUser) {
      res.status(404).json({ error: `User not found with ID ${userId}` });
      return;
    }

    // Validate file presence
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Construct file path
    const profilePicPath = getProfilePicPath(req);

    if (existingUser.profile) {
      const oldFilePath = path.join(__dirname, `../${existingUser.profile}`);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { profile: profilePicPath },
    });

    // Send success response
    res.json({
      message: 'Profile picture updated successfully',
      user: {
        ...updatedUser,
        profile: getFileUrl(req, profilePicPath),
      },
    });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};
