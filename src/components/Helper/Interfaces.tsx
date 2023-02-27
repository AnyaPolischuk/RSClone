export interface IRegisterFormErrors {
    fName?: string
    lName?: string
    email: string
    password: string
    repeatPassword?: string,
    server: string
}

export interface IBanner {
    message: string;
    type: 'success' | 'error';
}