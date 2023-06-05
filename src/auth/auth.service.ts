import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { CustomerModel } from 'src/customers/customers.model';
import { AuthErrorMessage } from 'src/errors/auth-errors';
import { LoginCustomerDto } from 'src/customers/dto/login-customer.dto';
import { LoginEmployeeDto } from 'src/employees/dto/login-employee.dto';
import { EmployeeModel } from 'src/employees/employees.model';
import { EmployeesService } from 'src/employees/employees.service';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { authConfig } from './auth-config';

export interface ILoginResponseInfo {
    token: string;
    id: string;
    name: string;
    role: string;
    email: string;
}

@Injectable()
export class AuthService {
    constructor(
        private customerService: CustomersService,
        private employeeService: EmployeesService,
        private jwtService: JwtService) {}

    async loginCustomer(loginCustomerDto: LoginCustomerDto): Promise<ILoginResponseInfo> {
        const customer = await this.validateCustomer(loginCustomerDto);
        return {
            token: await this.generateTokenForCustomer(customer),
            id: customer.id,
            name: customer.first_name,
            role: customer.role.name,
            email: customer.email
        };
    }

    async registrationCustomer(createCustomerDto: CreateCustomerDto) {
        try {
            const candidate = await this.customerService.getCustomerByEmail(createCustomerDto.email);
            if (candidate) throw new HttpException(AuthErrorMessage.UserWithThisEmailAlreadyExists, HttpStatus.BAD_REQUEST);
            const hashPassword = await bcrypt.hash(createCustomerDto.password, authConfig.HASH_SALT);
            await this.customerService.createCustomer({ ...createCustomerDto, password: hashPassword });
        } catch (error) {
            if (error instanceof HttpException) throw new HttpException(error.getResponse(), error.getStatus());
            throw new HttpException(AuthErrorMessage.InternalError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async loginEmployee(loginEmployeeDto: LoginEmployeeDto): Promise<ILoginResponseInfo> {
        const employee = await this.validateEmployee(loginEmployeeDto);
        return {
            token: await this.generateTokenForEmployee(employee),
            id: employee.id,
            name: employee.first_name,
            role: employee.role.name,
            email: employee.email
        };
    }

    async registrationEmployee(createEmployeeDto: CreateEmployeeDto) {
        try {
            const candidate = await this.employeeService.getEmployeeByEmail(createEmployeeDto.email);
            if (candidate) throw new HttpException(AuthErrorMessage.UserWithThisEmailAlreadyExists, HttpStatus.BAD_REQUEST);
            const hashPassword = await bcrypt.hash(createEmployeeDto.password, authConfig.HASH_SALT);
            await this.employeeService.createEmployee({ ...createEmployeeDto, password: hashPassword });
        } catch (error) {
            if (error instanceof HttpException) throw new HttpException(error.getResponse(), error.getStatus());
            throw new HttpException(AuthErrorMessage.InternalError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async generateTokenForCustomer(customerModel: CustomerModel): Promise<string> {
        const payload = { 
            email: customerModel.email,
            id: customerModel.id,
            role: customerModel.role
        };
        
        return this.jwtService.sign(payload);
    }

    private async generateTokenForEmployee(employeeModel: EmployeeModel): Promise<string> {
        const payload = { 
            email: employeeModel.email, 
            id: employeeModel.id,
            role: employeeModel.role
        };
        
        return this.jwtService.sign(payload);
    }
    
    private async validateCustomer(loginCustomerDto: LoginCustomerDto) {
        const customer = await this.customerService.getCustomerByEmail(loginCustomerDto.email);
        if (!customer) throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
        const passwordsAreEqual = await bcrypt.compare(loginCustomerDto.password, customer.password);
        if (passwordsAreEqual) return customer;
        throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
    }

    private async validateEmployee(loginEmployeeDto: LoginEmployeeDto) {
        const employee = await this.employeeService.getEmployeeByEmail(loginEmployeeDto.email);
        if (!employee) throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
        const passwordsAreEqual = await bcrypt.compare(loginEmployeeDto.password, employee.password);
        if (passwordsAreEqual) return employee;
        throw new UnauthorizedException({ message: AuthErrorMessage.EmailOrPasswordAreWrong });
    }
}
