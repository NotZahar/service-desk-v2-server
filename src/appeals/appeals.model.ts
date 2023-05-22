import sequelize from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AppealStatusModel } from "src/appeal-statuses/appeal-statuses.model";
import { CustomerModel } from "src/customers/customers.model";

interface AppealCreationAttrs {
    theme: string;
    text: string;
    file: string | null;
    customer_id: string;
    date: Date;
    status_id: string;
}

@Table({ tableName: 'appeals' })
export class AppealModel extends Model<AppealModel, AppealCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    theme: string;

    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @Column({ type: DataType.STRING, allowNull: true })
    file: string;

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.UUID, allowNull: false })
    customer_id: string;

    @Column({ type: DataType.DATE, allowNull: false })
    date: string;

    @ForeignKey(() => AppealStatusModel)
    @Column({ type: DataType.UUID, allowNull: false })
    status_id: string;
    
    @BelongsTo(() => CustomerModel)
    customer: CustomerModel;

    @BelongsTo(() => AppealStatusModel)
    status: AppealStatusModel;
}