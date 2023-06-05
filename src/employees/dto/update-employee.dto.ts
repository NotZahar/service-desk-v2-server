import { IsEmail, IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class UpdateEmployeeDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly id: string;

    @IsEmail({}, { message: ValidationMessage.MustBeEmail })
    readonly email: string;

    readonly password: string | null;

    readonly first_name: string | null;

    readonly second_name: string | null;

    readonly patronymic?: string | null;
    
    readonly phone_number?: string | null;
    
    readonly appointment: string | null;
    
    readonly department: string | null;
}