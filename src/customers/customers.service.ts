import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles-list';
import { CustomerModel } from './customers.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { RolesErrorMessage } from 'src/errors/roles-errors';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(CustomerModel) private customerRepository: typeof CustomerModel,
        private rolesService: RolesService) {}

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerModel> {
        const role = await this.rolesService.getRoleByName(Role.CUSTOMER);
        if (!role) throw new Error(RolesErrorMessage.RoleNotFound);
        const customer = await this.customerRepository.create({ ...dto, role_id: role.id });
        customer.role = role;
        return customer;
    }

    async getAllCustomers(): Promise<CustomerModel[]> {
        const customers = await this.customerRepository.findAll({ 
            include: { 
                all: true 
            } 
        });
        return customers;
    }

    async getCustomerByEmail(email: string) {
        const customer = await this.customerRepository.findOne({
            where: { email },
            include: { all: true }
        });
        return customer;
    }
}
