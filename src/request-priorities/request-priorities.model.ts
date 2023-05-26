import sequelize from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { RequestModel } from "src/requests/requests.model";

interface RequestPriorityCreationAttrs {
    name: string;
}

@Table({ tableName: 'request-priorities' })
export class RequestPriorityModel extends Model<RequestPriorityModel, RequestPriorityCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @HasMany(() => RequestModel)
    requests: RequestModel[];
}