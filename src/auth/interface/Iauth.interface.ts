
export interface IAuthInterface {
    signIn(signinAuthDto: any): Promise<any>;
    signUp(signUpAuthDto: any): Promise<any>;
    validatePassword(plainTextPassword: string,hashedPassword: string): Promise<any>;
    getTokens(userId:string, email:string): Promise<any>;
}