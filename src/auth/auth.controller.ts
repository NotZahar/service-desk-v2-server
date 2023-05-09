import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { LoginCustomerDto } from 'src/customers/dto/login-customer.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
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

    // @Post('/login-employee')
    // loginEmployee(@Body() userDto: CreateUserDto) {

    // }

    // @Post('/registration-employee')
    // registrationEmployee(@Body() userDto: CreateUserDto) {

    // }
}
