import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.employeesService.getOne(id);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.employeesService.getAll();
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(createEmployeeDto);
    }
}
