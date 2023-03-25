export interface IAuthRepositoryInterface {
    signIn(signinAuthDto: any): Promise<any>;
    signUp(signUpAuthDto: any): Promise<any>;
}