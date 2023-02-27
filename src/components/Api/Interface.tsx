export interface IUser {
    'first_name' : string;
    'last_name' : string;
    'email' : string;
    'password' : string;
}

export type ILogin = Pick<IUser, 'email' | 'password'>;

export interface IUserData{
    '_id': string;
    startTime: number | null;
    endTime: number | null;
    length: number;
    errorChar: number;
    correctChar: number;
    text: string;
    currIndex: number;
    time: number | null | undefined;
    'fullName': string;
    'date': string;
    'percent': number;
}

export type IUserSendData = Omit<IUserData, '_id'|'fullName'|'date'>
