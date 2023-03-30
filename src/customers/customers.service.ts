import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerModel } from './customers.model';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(@InjectModel(CustomerModel) private customerRepository: typeof CustomerModel) {}

    async createCustomer(dto: CreateCustomerDto): Promise<CustomerModel> {
        const customer = await this.customerRepository.create(dto);
        return customer;
    }

    async getAllCustomers(): Promise<CustomerModel[]> {
        const customers = await this.customerRepository.findAll();
        return customers;
    }
}
