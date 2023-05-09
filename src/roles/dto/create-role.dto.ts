import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ValidationMessage } from "src/errors/validation-messages";

export class CreateRoleDto {
    @ApiProperty({ example: 'customer', description: 'Role name' })
    @IsString({ message: ValidationMessage.MustBeString })
    readonly name: string;
}