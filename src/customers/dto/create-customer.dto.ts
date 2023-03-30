import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto { 
    @ApiProperty({ example: 'customer@mail.com', description: 'E-mail' })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    readonly password: string;

    @ApiProperty({ example: 'customer', description: 'Role [only \'customer\']' })
    readonly role: ;

    @ApiProperty({ example: 'Zahar', description: 'First name' })
    readonly first_name: string;

    @ApiProperty({ example: 'Glushkin', description: 'Second (last) name' })
    readonly second_name: string;
}