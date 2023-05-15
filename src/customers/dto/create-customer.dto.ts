import { IsEmail, IsString, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateCustomerDto {
    @IsString({ message: ValidationMessage.MustBeString })
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @IsString({ message: ValidationMessage.MustBeString })
    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly first_name: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly second_name: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly patronymic: string;
    
    @IsString({ message: ValidationMessage.MustBeString })
    readonly phone_number: string;
    
    @IsString({ message: ValidationMessage.MustBeString })
    readonly organization: string;
}