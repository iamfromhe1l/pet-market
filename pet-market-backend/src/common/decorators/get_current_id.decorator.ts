import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentId = createParamDecorator(
    (_, context: ExecutionContext) =>
        context.switchToHttp().getRequest().user["id"],
);
