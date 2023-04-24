import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateCustomerDto { 
    @ApiProperty({ example: 'customer@mail.com', description: 'E-mail' })
    @IsString({ message: ValidationMessage.MustBeString })
    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @IsString({ message: ValidationMessage.MustBeString })
    @Length( 6, 8, { message: ValidationMessage.PasswordConstraint } )
    readonly password: string;

    @ApiProperty({ example: 'Zahar', description: 'First name' })
    @IsString({ message: ValidationMessage.MustBeString })
    readonly first_name: string;

    @ApiProperty({ example: 'Glushkin', description: 'Second (last) name' })
    @IsString({ message: ValidationMessage.MustBeString })
    readonly second_name: string;
}