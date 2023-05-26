import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CustomerModel } from "src/customers/customers.model";
import { EmployeeModel } from "src/employees/employees.model";
import { RequestModel } from "src/requests/requests.model";

interface UserCustomerMessageCreationAttrs {
    date: Date;
    file: string | null;
    text: string;
    employee_id: string | null;
    customer_id: string | null;
    request_id: string;
}

@Table({ tableName: 'user-customer-messages' })
export class UserCustomerMessageModel extends Model<UserCustomerMessageModel, UserCustomerMessageCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @Column({ type: DataType.STRING, allowNull: true })
    file: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    text: string;

    @ForeignKey(() => EmployeeModel)
    @Column({ type: DataType.UUID, allowNull: true })
    employee_id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.UUID, allowNull: true })
    customer_id: string;

    @ForeignKey(() => RequestModel)
    @Column({ type: DataType.UUID, allowNull: false })
    request_id: string;

    @BelongsTo(() => EmployeeModel)
    employee: EmployeeModel;

    @BelongsTo(() => CustomerModel)
    customer: CustomerModel;

    @BelongsTo(() => RequestModel)
    request: RequestModel;
}