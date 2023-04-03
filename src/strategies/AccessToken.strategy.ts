import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { TaskService } from "src/task/service/task/task.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
    constructor(private readonly taskService: TaskService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "rovarkamilothmanaziz",
        });
    }

    async validate(payload: any) {
        return payload;
    }
}