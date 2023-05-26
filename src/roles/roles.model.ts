import sequelize from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CustomerModel } from "src/customers/customers.model";
import { EmployeeModel } from "src/employees/employees.model";

interface RoleCreationAttrs {
    name: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => CustomerModel)
    customers: CustomerModel[];

    @HasMany(() => EmployeeModel)
    employees: EmployeeModel[];
}