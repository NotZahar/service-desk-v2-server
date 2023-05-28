import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class UpdatePriorityDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly id: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly priority_name: string;
}