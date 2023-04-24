import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/login-customer')
    loginCustomer(@Body() customerDto: CreateCustomerDto) {
        return this.authService.loginCustomer(customerDto);
    }

    @Post('/registration-customer')
    registrationCustomer(@Body() customerDto: CreateCustomerDto) { // TODO: change to another DTO
        return this.authService.registrationCustomer(customerDto);
    }

    // @Post('/login-employee')
    // loginEmployee(@Body() userDto: CreateUserDto) {

    // }

    // @Post('/registration-employee')
    // registrationEmployee(@Body() userDto: CreateUserDto) {

    // }
}
