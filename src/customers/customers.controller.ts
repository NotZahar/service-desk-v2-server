import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}    

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.createCustomer(createCustomerDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.customersService.getAll();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-name')
    getFilteredByName(@Query('pattern') pattern: string) {
        return this.customersService.getFilteredByName(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-email')
    getFilteredByEmail(@Query('pattern') pattern: string) {
        return this.customersService.getFilteredByEmail(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-phone-number')
    getFilteredByPhoneNumber(@Query('pattern') pattern: string) {
        return this.customersService.getFilteredByPhoneNumber(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-organization')
    getFilteredByOrganization(@Query('pattern') pattern: string) {
        return this.customersService.getFilteredByOrganization(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered')
    getFiltered(@Query('pattern') pattern: string) {
        return this.customersService.getFiltered(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put()
    updateCustomer(@Body() updateCustomerDto: UpdateCustomerDto) {
        return this.customersService.updateCustomer(updateCustomerDto);
    }
}
