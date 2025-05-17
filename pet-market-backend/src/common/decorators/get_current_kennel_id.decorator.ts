import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentKennelId = createParamDecorator(
    (_, context: ExecutionContext) =>
        context.switchToHttp().getRequest().user["kennelId"],
);
