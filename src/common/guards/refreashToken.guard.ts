import { AuthGuard } from '@nestjs/passport';
import {  Injectable } from '@nestjs/common';

@Injectable()
export class RefreashTokenGuard extends AuthGuard("refreash-token") {
    constructor() {
        super();
    }
}