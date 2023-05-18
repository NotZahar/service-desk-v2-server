import { IsEmail, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class LoginEmployeeDto { 
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;
}