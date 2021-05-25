import { ICreateUser, IUpdateUser, IUser } from "../interfaces/user.interface";
import { pool } from '../database/db';
import { Result } from "express-validator";

export default class User {
   static async get(userId: number): Promise<IUser[]> {
      try {
         const user: IUser[] = (await pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive , createdAt, modifiedAt FROM Users WHERE userId = $1", [userId])).rows;
         return user;
      } catch(err) {
         throw err;
      }
   }

   static async list(): Promise<IUser[]> {
      try {
         const users: IUser[] = (await pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt FROM Users")).rows;
         return users;
      } catch(err) {
         throw err;
      }
   }
   
   static async create(user: ICreateUser): Promise<IUser[]> {
      try {
         const newUserId: IUser[] = (await pool.query("INSERT INTO Users (username, email, password, userPhoto, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt", [ user.userName, user.email, user.password, user.userPhoto, user.isActive])).rows;
         return newUserId;
      } catch(err) {
         throw err;
      }
   }

   static async update(user: IUpdateUser): Promise<IUser[]> {
      try {
         const updatedUser: IUser[] = (await pool.query("UPDATE Users SET userName = $1, email = $2, password = $3, userPhoto = $4, isActive = $5, modifiedAt = $6 WHERE userId = $7 RETURNING userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt", [ user.userName, user.email, user.password, user.userPhoto, user.isActive, user.modifiedAt, user.userId])).rows;
         return updatedUser;
      } catch(err) {
         throw err;
      }
   }

   static async delete(userId: number): Promise<{ message: string}> {
      try {
         const user = (await pool.query("DELETE FROM Users WHERE userId = $1", [ userId ])).rows;
         return (user.length == 0) ? { message : 'User deleted'} : { message : 'Failed to delete user'};
      } catch(err) {
         throw err;
      }
   }
}