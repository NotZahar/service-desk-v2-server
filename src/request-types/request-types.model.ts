import sequelize from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { RequestModel } from "src/requests/requests.model";

interface RequestTypeCreationAttrs {
    name: string;
}

@Table({ tableName: 'request-types' })
export class RequestTypeModel extends Model<RequestTypeModel, RequestTypeCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => RequestModel)
    requests: RequestModel[];
}