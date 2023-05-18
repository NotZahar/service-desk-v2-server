import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleModel } from "src/roles/roles.model";

interface EmployeeCreationAttrs {
    email: string;
    password: string;
    role_id: string;
    first_name: string | null;
    second_name: string | null;
    patronymic: string | null;
    phone_number: string | null;
    department: string | null;
    appointment: string | null;
}

@Table({ tableName: 'employees' })
export class EmployeeModel extends Model<EmployeeModel, EmployeeCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.UUID, allowNull: false })
    role_id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    second_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    phone_number: string;

    @Column({ type: DataType.STRING, allowNull: false })
    department: string;

    @Column({ type: DataType.STRING, allowNull: false })
    appointment: string;
    
    @BelongsTo(() => RoleModel)
    role: RoleModel;
}