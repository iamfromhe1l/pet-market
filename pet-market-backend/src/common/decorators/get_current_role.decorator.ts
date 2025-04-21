import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentRt = createParamDecorator(
    (_, context: ExecutionContext) =>
        context.switchToHttp().getRequest().user["role"],
);
