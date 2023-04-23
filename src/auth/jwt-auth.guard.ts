import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthErrorMessage } from "src/errors/auth-errors";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const token = req.headers.authorization;
            if (!token) throw new UnauthorizedException({ message: AuthErrorMessage.AuthTokenNotFound });
            const user = this.jwtService.verify(token);
            req.user = user;
            
            return true;
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException({ message: AuthErrorMessage.GeneralGuard });
        }
    }
}