import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateFileDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly folderPath: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly fileName: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly data: string;
}