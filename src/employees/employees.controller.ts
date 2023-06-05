import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private employeesService: EmployeesService) {}

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/one/:id')
    getOne(@Param('id') id: string) {
        return this.employeesService.getOne(id);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.employeesService.getAll();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-name')
    getFilteredByName(@Query('pattern') pattern: string) {
        return this.employeesService.getFilteredByName(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-email')
    getFilteredByEmail(@Query('pattern') pattern: string) {
        return this.employeesService.getFilteredByEmail(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-appointment')
    getFilteredByAppointment(@Query('pattern') pattern: string) {
        return this.employeesService.getFilteredByAppointment(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-department')
    getFilteredByDepartment(@Query('pattern') pattern: string) {
        return this.employeesService.getFilteredByDepartment(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered')
    getFiltered(@Query('pattern') pattern: string) {
        return this.employeesService.getFiltered(pattern);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(createEmployeeDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put()
    updateEmployee(@Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeesService.updateEmployee(updateEmployeeDto);
    }
}
