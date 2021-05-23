export interface IUser {
    userId: number;
    username: string;
    email: string;
    userPhoto?: string;
    createdAt?: string;
    modifiedAt?: string;
}

export interface IUserLogin extends IUser {
    password: string;
}