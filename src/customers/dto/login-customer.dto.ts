import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { authConfig } from "src/auth/auth-config";
import { ValidationMessage } from "src/errors/validation-messages";

export class LoginCustomerDto { 
    @ApiProperty({ example: 'customer@mail.com', description: 'E-mail' })
    @IsString({ message: ValidationMessage.MustBeString })
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString({ message: ValidationMessage.MustBeString })
    @MinLength( authConfig.PASSWORD_MIN_LENGTH, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;
}