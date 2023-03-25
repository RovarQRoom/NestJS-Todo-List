import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./service/auth/auth.service";
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(); // config
  }

  // async validate(username: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}