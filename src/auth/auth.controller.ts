import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { LoginCustomerDto } from 'src/customers/dto/login-customer.dto';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { LoginEmployeeDto } from 'src/employees/dto/login-employee.dto';
import { Role } from 'src/roles/roles-list';
import { AuthService } from './auth.service';
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/login-customer')
    loginCustomer(@Body() loginCustomerDto: LoginCustomerDto) {
        return this.authService.loginCustomer(loginCustomerDto);
    }

    @Post('/registration-customer')
    registrationCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.authService.registrationCustomer(createCustomerDto);
    }

    @Post('/login-employee')
    loginEmployee(@Body() loginEmployeeDto: LoginEmployeeDto) {
        return this.authService.loginEmployee(loginEmployeeDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Post('/registration-employee')
    registrationEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.authService.registrationEmployee(createEmployeeDto);
    }
}
