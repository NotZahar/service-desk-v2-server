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

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        const role = await this.rolesService.getRoleByName(Role.CUSTOMER);
        if (!role) throw new Error(RolesErrorMessage.RoleNotFound);
        await this.customerRepository.create({ ...createCustomerDto, role_id: role.id });
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
