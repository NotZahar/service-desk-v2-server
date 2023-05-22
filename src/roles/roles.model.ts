import sequelize from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttrs {
    name: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: sequelize.UUIDV4 })
    id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;
}