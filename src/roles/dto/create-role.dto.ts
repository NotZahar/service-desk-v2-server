import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateRoleDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly name: string;
}