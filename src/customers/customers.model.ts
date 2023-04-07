import { ApiProperty } from "@nestjs/swagger";
import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleModel } from "src/roles/roles.model";

interface CustomerCreationAttrs {
    email: string;
    password: string;
    role_id: string;
    first_name: string;
    second_name: string;
}

@Table({ tableName: 'customers' })
export class CustomerModel extends Model<CustomerModel, CustomerCreationAttrs> {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique id' })
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ApiProperty({ example: 'customer@mail.com', description: 'E-mail' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'Customer\'s role id', description: 'Role id [only \'customer\']' })
    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.UUID, unique: true, allowNull: false, defaultValue: sequelize.UUIDV4 })
    role_id: string;

    @ApiProperty({ example: 'Zahar', description: 'First name' })
    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @ApiProperty({ example: 'Glushkin', description: 'Second (last) name' })
    @Column({ type: DataType.STRING, allowNull: false })
    second_name: string;

    @ApiProperty({ example: 'Nickolaevich', description: 'Patronymic name' })
    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @ApiProperty({ example: '+79991112233', description: 'Phone number' })
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    phone_number: string;

    @ApiProperty({ example: 'PJSC Gazprom', description: 'Customer\'s organization' })
    @Column({ type: DataType.STRING, allowNull: true })
    organization: string;
    
    @BelongsTo(() => RoleModel)
    role: RoleModel;
}