import { IsEmail, IsString, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class LoginCustomerDto { 
    @IsString({ message: ValidationMessage.MustBeString })
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @IsString({ message: ValidationMessage.MustBeString })
    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;
}