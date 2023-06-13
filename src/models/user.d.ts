/*
* 用户类
* */

export type UserType = {
    id: string;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?:string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags: string[];
    createTime: Date;
}