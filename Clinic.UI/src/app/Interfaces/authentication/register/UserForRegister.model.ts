export enum Gender{
    Male = 0,
    Female = 1,
    Others = 2
}
export interface UserForRegister{
    firstName: string;
    lastName: string;
    pesel: string;
    allergies: string;
    gender: Gender;
    email: string
    password: string;
    passwordConfirm: string;
}