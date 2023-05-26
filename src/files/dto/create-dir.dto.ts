import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateDirDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly parentFolderPath: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly folderName: string;
}