import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { Role } from 'src/roles/roles-list';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Roles(Role.ADMIN)    
    @Post()
    create(@Body() employeeDto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(employeeDto);
    }
}
