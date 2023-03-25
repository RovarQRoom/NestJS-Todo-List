import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator((data: undefined,context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    
    return req.user['sub'];
});