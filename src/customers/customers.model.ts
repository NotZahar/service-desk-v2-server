import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleModel } from "src/roles/roles.model";

interface CustomerCreationAttrs {
    email: string;
    password: string;
    role_id: string;
    first_name: string;
    second_name: string;
    patronymic: string;
    phone_number: string;
    organization: string;
}

@Table({ tableName: 'customers' })
export class CustomerModel extends Model<CustomerModel, CustomerCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.UUID, unique: true, allowNull: false, defaultValue: sequelize.UUIDV4 })
    role_id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    second_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    patronymic: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    phone_number: string;

    @Column({ type: DataType.STRING, allowNull: true })
    organization: string;
    
    @BelongsTo(() => RoleModel)
    role: RoleModel;
}