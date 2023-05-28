import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class UpdateExecutorDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly id: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly executor_id: string;
}