import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { EmployeesErrorMessage } from 'src/errors/employee-errors';
import { RolesErrorMessage } from 'src/errors/roles-errors';
import { RolesService } from 'src/roles/roles.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeModel } from './employees.model';

const selectColumns = 'employees.id, email, role_id, first_name, second_name, patronymic, phone_number, department, appointment, roles.name as role_name';

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

    async getAll() {
        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
            FROM employees
            JOIN roles ON employees.role_id=roles.id
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return employees;
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
