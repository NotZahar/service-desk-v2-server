import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class GetFileContentDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly filePath: string;
}