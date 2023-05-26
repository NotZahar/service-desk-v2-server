import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class GetDirContentDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly dirPath: string;
}