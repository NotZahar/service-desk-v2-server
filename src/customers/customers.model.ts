import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AppealModel } from "src/appeals/appeals.model";
import { RequestModel } from "src/requests/requests.model";
import { RoleModel } from "src/roles/roles.model";
import { UserCustomerMessageModel } from "src/user-customer-messages/user-customer-messages.model";

interface CustomerCreationAttrs {
    email: string;
    password: string;
    role_id: string;
    first_name: string | null;
    second_name: string | null;
    patronymic: string | null;
    phone_number: string | null;
    organization: string | null;
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

    @Column({ type: DataType.STRING, allowNull: true })
    organization: string;
    
    @BelongsTo(() => RoleModel)
    role: RoleModel;

    @HasMany(() => AppealModel, 'customer_id')
    appeals: AppealModel[];

    @HasMany(() => UserCustomerMessageModel, 'customer_id')
    user_customer_messages: UserCustomerMessageModel[];

    @HasMany(() => RequestModel, 'customer_id')
    requests: RequestModel[];
}