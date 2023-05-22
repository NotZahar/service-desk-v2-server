import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}    

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.createCustomer(createCustomerDto);
    }

    @Roles(Role.DISPATCHER) // TODO:
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.customersService.getAllCustomers();
    }
}
