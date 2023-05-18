import { IsEmail, IsString, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateEmployeeDto {
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly role_name: string;
    
    readonly first_name: string | null;

    readonly second_name: string | null;

    readonly patronymic?: string | null;
    
    readonly phone_number?: string | null;
    
    readonly department: string | null;

    readonly appointment: string | null;
}