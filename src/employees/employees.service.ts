import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { EmployeesErrorMessage } from 'src/errors/employee-errors';
import { RolesErrorMessage } from 'src/errors/roles-errors';
import { RoleModel } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeModel } from './employees.model';
import { authConfig } from 'src/auth/auth-config';

const selectColumns = `
    employees.id, 
    email, 
    role_id, 
    first_name, 
    second_name, 
    patronymic, 
    phone_number, 
    department, 
    appointment, 
    roles.name as role_name`;

const joins = `
    JOIN roles ON employees.role_id=roles.id`;

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
            ${joins}
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return employees;
    }

    async getFilteredByName(pattern: string) {
        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
         
            FROM employees
            ${joins}
            
            WHERE first_name ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return employees;
    }

    async getFilteredByEmail(pattern: string) {
        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
         
            FROM employees
            ${joins}
            
            WHERE email ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return employees;
    }

    async getFilteredByAppointment(pattern: string) {
        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
         
            FROM employees
            ${joins}
            
            WHERE appointment ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return employees;
    }

    async getFilteredByDepartment(pattern: string) {
        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
         
            FROM employees
            ${joins}
            
            WHERE department ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return employees;
    }

    async getFiltered(pattern: string) {
        console.log('filtered!!!!!!!!!!!!1');

        const employees = await EmployeeModel.sequelize?.query(
            `SELECT ${selectColumns}
         
            FROM employees
            ${joins}
            
            WHERE (first_name ILIKE '%${pattern}%')
                OR (email ILIKE '%${pattern}%')
                OR (appointment ILIKE '%${pattern}%')
                OR (department ILIKE '%${pattern}%')
            
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
            include: RoleModel
        });
        return employee;
    }

    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {        
        await this.employeeRepository.update(
            { 
                email: updateEmployeeDto.email,
                first_name: updateEmployeeDto.first_name || undefined,
                second_name: updateEmployeeDto.second_name || undefined,
                patronymic: updateEmployeeDto.patronymic || undefined,
                phone_number: updateEmployeeDto.phone_number || undefined,
                appointment: updateEmployeeDto.appointment || undefined,
                department: updateEmployeeDto.department || undefined 
            },
            { where: { id: updateEmployeeDto.id }}
        );

        if (updateEmployeeDto.password) {
            const hashPassword = await bcrypt.hash(updateEmployeeDto.password, authConfig.HASH_SALT);
            await this.employeeRepository.update(
                { 
                    password: hashPassword
                },
                { where: { id: updateEmployeeDto.id }}
            );
        }
    }
}
