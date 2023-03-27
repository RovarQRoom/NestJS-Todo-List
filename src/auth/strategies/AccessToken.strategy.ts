import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../service/auth/auth.service";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, process.env.ACCESS_TOKEN_STRATEGY) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_KEY,
        });
    }

    async validate(payload: any) {
        // const user = await this.authService.validateUser(payload);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;

        return payload;
    }
}