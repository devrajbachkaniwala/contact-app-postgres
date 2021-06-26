import { ICreateUser, IUpdateUser, IUser } from '../interfaces/user.interface';
import { db } from '../database/db';


export default class User {
   static async get(userId: number): Promise<IUser[]> {
      try {
         const user: IUser[] = (await db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').where('userId', '=', userId).get()).rows;
         return user;
      } catch (err) {
         throw err;
      }
   }

    static async list(): Promise<IUser[]> {
      try {
         const users: IUser[] = (await db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').get()).rows;
         return users;
      } catch(err) {
         throw err;
      }
   }
   static async create(user: ICreateUser): Promise<{ message: string}> {
      try {
         const newUserId: number= (await db.write.table('Users').insert(user).execute()).rowCount ;
         return (newUserId == 1) ? { message : 'New user created successfully'} : { message : 'Failed to create user'};
      } catch(err) {
         throw err;
      }
   }
   
   static async update(user: IUpdateUser): Promise<{ message: string}> {
      try {
         const updatedUser: number = (await db.update.table('Users').update(user).where('userId', '=', user.userId).execute()).rowCount;
         return (updatedUser == 1) ? { message : 'User updated successfully'} : { message : 'Failed to update user'};
      } catch(err) {
         throw err;
      }
   }
   
   
   static async delete(userId: number): Promise<{ message: string}> {
      try {
         const user = (await db.delete.table('Users').where('userId', '=', userId).delete()).rows;
         return (user.length == 0) ? { message : 'User deleted successfully'} : { message : 'Failed to delete user'};
      } catch(err) {
         throw err;
      }
   } 
}