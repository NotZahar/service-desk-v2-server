import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @Get()
    getAll() {
        return this.customersService.getAllCustomers();
    }
}
