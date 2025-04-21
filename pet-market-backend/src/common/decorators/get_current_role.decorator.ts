import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentRole = createParamDecorator(
    (_, context: ExecutionContext) =>
        context.switchToHttp().getRequest().user["role"],
);
