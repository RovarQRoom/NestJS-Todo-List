import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor() {
        super({
            clientID: "332610033221-12aidrjfqjbhqf2aj0dalfo9t1r4cnhe.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/login/google/callback",
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        };
        done(null, user);
    }
}