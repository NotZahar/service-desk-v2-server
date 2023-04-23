import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CustomerModel } from './customers.model';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@ApiTags('Work with customers')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}    

    @ApiOperation({ summary: 'Customer creation' })
    @ApiResponse({ status: 200, type: CustomerModel })
    @Post()
    create(@Body() customerDto: CreateCustomerDto) {
        return this.customersService.createCustomer(customerDto);
    }

    @ApiOperation({ summary: 'Get all customers' })
    @ApiResponse({ status: 200, type: [CustomerModel] })
    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.customersService.getAllCustomers();
    }
}
