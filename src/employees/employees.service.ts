import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesErrorMessage } from 'src/errors/roles-errors';
import { RolesService } from 'src/roles/roles.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeModel } from './employees.model';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel(EmployeeModel) private employeeRepository: typeof EmployeeModel,
        private rolesService: RolesService) {}

    async createEmployee(dto: CreateEmployeeDto): Promise<EmployeeModel> {
        const role = await this.rolesService.getRoleByName(dto.role_name);
        if (!role) throw new Error(RolesErrorMessage.RoleNotFound);
        const employee = await this.employeeRepository.create({ ...dto, role_id: role.id });
        employee.role = role;
        return employee;
    }

    async getEmployeeByEmail(email: string) {
        const employee = await this.employeeRepository.findOne({
            where: { email },
            include: { all: true }
        });
        return employee;
    }
}
