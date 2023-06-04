import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles-list';
import { CustomerModel } from './customers.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RolesErrorMessage } from 'src/errors/roles-errors';
import sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RoleModel } from 'src/roles/roles.model';

const selectColumns = `
    customers.id, 
    email, 
    role_id, 
    first_name, 
    second_name, 
    patronymic, 
    phone_number, 
    organization, 
    roles.name as role_name`;

const joins = `
    JOIN roles ON customers.role_id=roles.id`;

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(CustomerModel) private customerRepository: typeof CustomerModel,
        private rolesService: RolesService) {}

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        const role = await this.rolesService.getRoleByName(Role.CUSTOMER);
        if (!role) throw new Error(RolesErrorMessage.RoleNotFound);
        await this.customerRepository.create({ ...createCustomerDto, role_id: role.id });
    }

    async getAll() {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT ${selectColumns}
            
            FROM customers
            ${joins}
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return customers;
    }

    async getFilteredByName(pattern: string) {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM customers
            ${joins}
            
            WHERE first_name ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customers;
    }

    async getFilteredByEmail(pattern: string) {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM customers
            ${joins}
            
            WHERE email ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customers;
    }

    async getFilteredByPhoneNumber(pattern: string) {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM customers
            ${joins}
            
            WHERE phone_number ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customers;
    }

    async getFilteredByOrganization(pattern: string) {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM customers
            ${joins}
            
            WHERE organization ILIKE '%${pattern}%'
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customers;
    }

    async getFiltered(pattern: string) {
        const customers = await CustomerModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM customers
            ${joins}
            
            WHERE (first_name ILIKE '%${pattern}%')
                OR (email ILIKE '%${pattern}%')
                OR (phone_number ILIKE '%${pattern}%')
                OR (organization ILIKE '%${pattern}%')
            
            ORDER BY first_name ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customers;
    }

    async getCustomerByEmail(email: string) {
        const customer = await this.customerRepository.findOne({
            where: { email },
            include: RoleModel
        });
        return customer;
    }
   
    async updateCustomer(updateCustomerDto: UpdateCustomerDto) {        
        await this.customerRepository.update(
            { 
                email: updateCustomerDto.email,
                first_name: updateCustomerDto.first_name || undefined,
                second_name: updateCustomerDto.second_name || undefined,
                patronymic: updateCustomerDto.patronymic || undefined,
                phone_number: updateCustomerDto.phone_number || undefined,
                organization: updateCustomerDto.organization || undefined 
            },
            { where: { id: updateCustomerDto.id }}
        );

        if (updateCustomerDto.password) {
            const hashPassword = await bcrypt.hash(updateCustomerDto.password, 10);
            await this.customerRepository.update(
                { 
                    password: hashPassword
                },
                { where: { id: updateCustomerDto.id }}
            );
        }
    }
}
