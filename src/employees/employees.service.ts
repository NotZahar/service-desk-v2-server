import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeesErrorMessage } from 'src/errors/employee-errors';
import { RolesErrorMessage } from 'src/errors/roles-errors';
import { RolesService } from 'src/roles/roles.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeModel } from './employees.model';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel(EmployeeModel) private employeeRepository: typeof EmployeeModel,
        private rolesService: RolesService) {}

    async getOne(id: string): Promise<EmployeeModel> {
        const employee = await this.employeeRepository.findByPk(id);
        if (!employee) throw new Error(EmployeesErrorMessage.EmployeeNotFound);
        return employee;
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        const role = await this.rolesService.getRoleByName(createEmployeeDto.role_name);
        if (!role) throw new Error(RolesErrorMessage.RoleNotFound);
        await this.employeeRepository.create({ ...createEmployeeDto, role_id: role.id });
    }

    async getEmployeeByEmail(email: string) {
        const employee = await this.employeeRepository.findOne({
            where: { email: email },
            include: { all: true }
        });
        return employee;
    }
}
