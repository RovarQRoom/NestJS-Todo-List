import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator((data: undefined,context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    console.log(req.user['sub']);
    
    
    return req.user['sub'];
});