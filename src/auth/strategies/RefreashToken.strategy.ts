import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../service/auth/auth.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreashTokenStrategy extends PassportStrategy(Strategy, 'refreash-token') {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "hevarkamilothmanaziz",
            passReqToCallback: true,
        });
    }

    async validate(request: Request,payload: any) {
        // const user = await this.authService.validateUser(payload);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        // return user;

        const refreashtoken = request.get("authorization").replace("Bearer ", "").trim();

        return {...payload, refreashtoken};
    }
}