import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateUserCustomerMessageDto {
    file: string | null;

    @IsString({ message: ValidationMessage.MustBeString })
    text: string;

    employee_id: string | null;

    customer_id: string | null;

    @IsString({ message: ValidationMessage.MustBeString })
    request_id: string;
}