import { IsEmail, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateCustomerDto {
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;

    readonly first_name: string | null;

    readonly second_name: string | null;

    readonly patronymic?: string | null;
    
    readonly phone_number?: string | null;
    
    readonly organization?: string | null;
}