import sequelize from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AppealStatusCreationAttrs {
    name: string;
}

@Table({ tableName: 'appeal-statuses' })
export class AppealStatusModel extends Model<AppealStatusModel, AppealStatusCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;
}