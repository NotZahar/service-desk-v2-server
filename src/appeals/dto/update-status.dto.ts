import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class UpdateStatusDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly id: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly status_name: string;
}