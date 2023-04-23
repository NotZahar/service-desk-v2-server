import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthErrorMessage } from "src/errors/auth-errors";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) return true;

        const req = context.switchToHttp().getRequest();

        try {
            const token = req.headers.authorization;
            if (!token) throw new UnauthorizedException({ message: AuthErrorMessage.AuthTokenNotFound });
            const user = this.jwtService.verify(token);
            req.user = user;
            return requiredRoles.includes(user.role.name);
        } catch (err) {
            console.log(err);
            throw new HttpException(AuthErrorMessage.NoAccess, HttpStatus.FORBIDDEN);
        }
    }
}
