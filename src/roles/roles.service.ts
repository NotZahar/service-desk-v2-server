import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(RoleModel) private roleRepository: typeof RoleModel) {}

    async createRole(createRoleDto: CreateRoleDto) {
        await this.roleRepository.create(createRoleDto);
    }

    async getRoleByName(name: string): Promise<RoleModel | null> {
        const role = await this.roleRepository.findOne({ where: { name } });
        return role;
    }
}
