import { ApiProperty } from "@nestjs/swagger";
import sequelize from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CustomerModel } from "src/customers/customers.model";
import { Role } from "./roles-list";

interface RoleCreationAttrs {
    name: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique id' })
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ApiProperty({ example: 'customer', description: 'User role' }) 
    @Column({ type: DataType.STRING, unique: true, allowNull: false, defaultValue: Role.CUSTOMER })
    name: string;

    @HasMany(() => CustomerModel)
    customers: CustomerModel[];
}