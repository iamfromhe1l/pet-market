import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../common/decorators/role.decorator";
import { UserRole } from "../../common/types/roles.enum";
import { Errors } from "../../common/constants/errors";

@Injectable()
export class RBACGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException(Errors.NOT_AUTHENTICATED);
        }
        console.log("User role:", user.role, user.rt, user);

        if (user.role === UserRole.SELLER) {
            const kennelId = request.params.kennelId;
            if (user.kennelId !== kennelId) {
                throw new UnauthorizedException(Errors.NOT_AUTHORIZED);
            }
        }

        return requiredRoles.includes(user.role);
    }
}
