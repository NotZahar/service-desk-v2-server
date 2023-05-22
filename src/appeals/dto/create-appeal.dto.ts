import { IsDateString, IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateAppealDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly theme: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly text: string;

    readonly file: string | null;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly customer_id: string;

    @IsDateString({}, { message: ValidationMessage.MustBeDate })
    readonly date: Date;
    
    @IsString({ message: ValidationMessage.MustBeString })
    readonly status_id: string;
}