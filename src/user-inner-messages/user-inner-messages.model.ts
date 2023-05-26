import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { EmployeeModel } from "src/employees/employees.model";
import { RequestModel } from "src/requests/requests.model";

interface UserInnerMessageCreationAttrs {
    date: Date;
    file: string | null;
    text: string;
    employee_id: string;
    request_id: string;
}

@Table({ tableName: 'user-inner-messages' })
export class UserInnerMessageModel extends Model<UserInnerMessageModel, UserInnerMessageCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @Column({ type: DataType.STRING, allowNull: true })
    file: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    text: string;

    @ForeignKey(() => EmployeeModel)
    @Column({ type: DataType.UUID, allowNull: false })
    employee_id: string;

    @ForeignKey(() => RequestModel)
    @Column({ type: DataType.UUID, allowNull: false })
    request_id: string;

    @BelongsTo(() => EmployeeModel)
    employee: EmployeeModel;

    @BelongsTo(() => RequestModel)
    request: RequestModel;
}