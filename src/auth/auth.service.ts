import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { CustomerModel } from 'src/customers/customers.model';
import { AuthErrorMessage } from 'src/errors/auth-errors';

@Injectable()
export class AuthService {
    constructor(
        private customerService: CustomersService,
        private jwtService: JwtService) {}

    async loginCustomer(customerDto: CreateCustomerDto) {
        const customer = await this.validateCustomer(customerDto);
        return this.generateToken(customer);
    }

    async registrationCustomer(customerDto: CreateCustomerDto) {
        const candidate = await this.customerService.getCustomerByEmail(customerDto.email);
        if (candidate) throw new HttpException(AuthErrorMessage.UserWithThisEmailAlreadyExists, HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(customerDto.password, 10);
        const customer = await this.customerService.createCustomer({ ...customerDto, password: hashPassword });
        return this.generateToken(customer);
    }

    private async generateToken(customerModel: CustomerModel): Promise<string> {
        const payload = { 
            email: customerModel.email, 
            id: customerModel.id,
            role: customerModel.role
        };
        
        return this.jwtService.sign(payload);
    }

    private async validateCustomer(customerDto: CreateCustomerDto) {
        const customer = await this.customerService.getCustomerByEmail(customerDto.email);
        if (!customer) throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
        const passwordsAreEqual = await bcrypt.compare(customerDto.password, customer.password);
        if (passwordsAreEqual) return customer;
        throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
    }
}
