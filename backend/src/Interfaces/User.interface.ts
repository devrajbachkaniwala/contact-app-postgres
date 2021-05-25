export interface IUser {
    userId: number;
    userName: string;
    email: string;
    userPhoto?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | null;
    modifiedAt?: Date | null;
}

export interface ICreateUser extends IUser {
    password: string;
}

export interface IUpdateUser extends ICreateUser {
    
}

export interface ILoginUser {
    email: string;
    password: string;
}