import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(RoleModel) private roleRepository: typeof RoleModel) {}

    async createRole(dto: CreateRoleDto): Promise<RoleModel> {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByName(name: string): Promise<RoleModel | null> {
        const role = await this.roleRepository.findOne({ where: { name } });
        return role;
    }
}
