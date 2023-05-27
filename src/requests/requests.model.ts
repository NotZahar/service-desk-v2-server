import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AppealModel } from "src/appeals/appeals.model";
import { CustomerModel } from "src/customers/customers.model";
import { EmployeeModel } from "src/employees/employees.model";
import { RequestPriorityModel } from "src/request-priorities/request-priorities.model";
import { RequestStatusModel } from "src/request-statuses/request-statuses.model";
import { RequestTypeModel } from "src/request-types/request-types.model";
import { UserCustomerMessageModel } from "src/user-customer-messages/user-customer-messages.model";
import { UserInnerMessageModel } from "src/user-inner-messages/user-inner-messages.model";

interface RequestCreationAttrs {
    controller_id: string;
    executor_id: string;
    priority_id: string;
    description: string;
    file: string | null;
    agreement: string | null;
    date: Date;
    appeal_id: string | null;
    theme: string;
    type_id: string;
    planned_date: Date;
    status_id: string;
    customer_id: string;
    finish_date: Date | null;
}

@Table({ tableName: 'requests' })
export class RequestModel extends Model<RequestModel, RequestCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @ForeignKey(() => EmployeeModel)
    @Column({ type: DataType.UUID, allowNull: false })
    controller_id: string;

    @ForeignKey(() => EmployeeModel)
    @Column({ type: DataType.UUID, allowNull: false })
    executor_id: string;

    @ForeignKey(() => RequestPriorityModel)
    @Column({ type: DataType.UUID, allowNull: false })
    priority_id: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.STRING, allowNull: true })
    file: string;

    @Column({ type: DataType.STRING, allowNull: true })
    agreement: string;

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @ForeignKey(() => AppealModel)
    @Column({ type: DataType.UUID, unique: true, allowNull: true })
    appeal_id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    theme: string;

    @ForeignKey(() => RequestTypeModel)
    @Column({ type: DataType.UUID, allowNull: false })
    type_id: string;

    @Column({ type: DataType.DATE, allowNull: false })
    planned_date: Date;

    @ForeignKey(() => RequestStatusModel)
    @Column({ type: DataType.UUID, allowNull: false })
    status_id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.UUID, allowNull: false })
    customer_id: string;

    @Column({ type: DataType.DATE, allowNull: true })
    finish_date: Date;

    @BelongsTo(() => EmployeeModel)
    controller: EmployeeModel;

    @BelongsTo(() => EmployeeModel)
    executor: EmployeeModel;

    @BelongsTo(() => RequestPriorityModel)
    request_priority: RequestPriorityModel;
    
    @BelongsTo(() => AppealModel)
    appeal: AppealModel;

    @BelongsTo(() => RequestTypeModel)
    request_type: RequestTypeModel;

    @BelongsTo(() => RequestStatusModel)
    request_status: RequestStatusModel;

    @BelongsTo(() => CustomerModel)
    customer: CustomerModel;

    @HasMany(() => UserInnerMessageModel)
    user_inner_messages: UserInnerMessageModel[];

    @HasMany(() => UserCustomerMessageModel)
    user_customer_messages: UserCustomerMessageModel[];
}