import { ICreateUser, IUpdateUser, IUser } from '../interfaces/user.interface';
import { db } from '../database/db';


export default class User {

   /* 
    *
    * returns an array of a particular user using userId from the database
    *    
   */
   static async get(userId: number): Promise<IUser[]> {
      try {
         const user: IUser[] = (await db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').where('userId', '=', userId).get()).rows;
         return user;
      } catch (err) {
         throw err;
      }
   }

   /* 
    *
    * returns an array of list of users from the database
    *    
   */
    static async list(): Promise<IUser[]> {
      try {
         const users: IUser[] = (await db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').get()).rows;
         return users;
      } catch(err) {
         throw err;
      }
   }

   /* 
    * 
    * creates new user in the database and returns an object which has message and result properties.
    * if new user is created successfully in the database then it returns an object with message property with value new user created successfully and result property with value true
    * if database failed to create new user then it returns an object with message property with value failed to create user and result property with value false
    *    
   */
   static async create(user: ICreateUser): Promise<{ message: string, result: boolean}> {
      try {
         const newUserId: number= (await db.write.table('Users').insert(user).execute()).rowCount ;
         return (newUserId == 1) ? { message : 'New user created successfully', result: true} : { message : 'Failed to create user', result: false};
      } catch(err) {
         throw err;
      }
   }

   /* 
    * 
    * updates user in the database and returns an object which has message and result properties.
    * if user is updated successfully in the database then it returns an object with message property with value user updated successfully and result property with value true
    * if database failed to update user then it returns an object with message property with value failed to update user and result property with value false
    *    
   */
   static async update(user: IUpdateUser): Promise<{ message: string, result: boolean}> {
      try {
         const updatedUser: number = (await db.update.table('Users').update(user).where('userId', '=', user.userId).execute()).rowCount;
         return (updatedUser == 1) ? { message : 'User updated successfully', result: true} : { message : 'Failed to update user', result: false};
      } catch(err) {
         throw err;
      }
   }
   
   /* 
    * 
    * delete specific user in the database using its userId and returns an object which has message and result properties.
    * if user is deleted successfully in the database then it returns an object with message property with value user deleted successfully and result property with value true
    * if database failed to delete user then it returns an object with message property with value failed to delete user and result property with value false
    *    
   */
   static async delete(userId: number): Promise<{ message: string, result: boolean}> {
      try {
         const user: number = (await db.delete.table('Users').where('userId', '=', userId).delete()).rowCount;
         return (user == 1) ? { message : 'User deleted successfully', result: true} : { message : 'Failed to delete user', result: false};
      } catch(err) {
         throw err;
      }
   } 

   /* 
    * 
    * validateEmail will take email parameter which will check email is present in the database returns an object which has message, result and userId properties.
    * if email exists in the database then it returns an object with message property with value correct email and result property with value true and userId property with value of that correct user's email userId
    * if email doesn't exists in the database then it returns an object with message property with value incorrect email and result property with value false and userId property with value null
    *    
   */
   static async validateEmail(email: string): Promise<{ message: string, result: boolean, userId: number }> {
      try {
         const isValid: Array<{ userid: number, email: string }> = (await db.read.columns([ 'userId', 'email' ]).tables('Users').where('email', 'LIKE', email).get()).rows;
         return (isValid.length == 1) ? { message : 'Correct email', result : true, userId : isValid[0].userid } : { message : 'Incorrect email', result : false, userId : null };
      } catch(err) {
         throw new Error(err);
      }
   }

   /* 
    * 
    * validatePassword will take password parameter which will check password is present in the database returns an object which has message, result and userId properties.
    * if password exists in the database then it returns an object with message property with value correct password and result property with value true and userId property with value of that correct user's password userId
    * if password doesn't exists in the database then it returns an object with message property with value incorrect password and result property with value false and userId property with value null
    *    
   */
   static async validatePassword(password: string): Promise<{ message: string, result: boolean, userId: number }> {
      try {
         const isValid: Array<{ userid: number, password: string }> = (await db.read.columns([ 'userId', 'password' ]).tables('Users').where('password', 'LIKE', password).get()).rows;
         return (isValid.length == 1) ? { message : 'Correct password', result : true, userId : isValid[0].userid } : { message : 'Incorrect password', result : false, userId : null };
      } catch(err) {
         throw new Error(err);
      }
   }
}