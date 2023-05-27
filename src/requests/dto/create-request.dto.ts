import { IsDateString, IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateRequestDto {
    @IsString({ message: ValidationMessage.MustBeString })
    readonly controller: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly executor: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly priority: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly description: string;

    readonly file: string | null;
    
    readonly agreement: string | null;

    readonly appeal_id: string | null;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly theme: string;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly  type: string;
    
    @IsDateString({}, { message: ValidationMessage.MustBeDate })
    readonly  planned_date: Date;

    @IsString({ message: ValidationMessage.MustBeString })
    readonly  status: string;
    
    @IsString({ message: ValidationMessage.MustBeString })
    readonly  customer: string;
}