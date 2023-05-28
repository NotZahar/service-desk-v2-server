import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class UpdateControllerDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly id: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly controller_id: string;
}