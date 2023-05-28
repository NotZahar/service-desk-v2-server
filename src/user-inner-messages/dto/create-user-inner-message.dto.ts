import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateUserInnerMessageDto {
    file: string | null;

    @IsString({ message: ValidationMessage.MustBeString })
    text: string;

    employee_id: string;

    @IsString({ message: ValidationMessage.MustBeString })
    request_id: string;
}
