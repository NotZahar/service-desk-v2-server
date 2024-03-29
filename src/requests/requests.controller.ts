import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { UpdateExecutorDto } from './dto/update-executor.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) {}

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRequestDto: CreateRequestDto) {
        return this.requestsService.createRequest(createRequestDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.requestsService.getAll();
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist')
    getSpecialistAll(@Query('id') id: string) {
        return this.requestsService.getSpecialistAll(id);
    }

    @Roles(Role.ADMIN, Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Get('/customer')
    getCustomerAll(@Query('id') id: string) {
        return this.requestsService.getCustomerAll(id);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/one')
    getSpecialistOne(@Query('spec_id') spec_id: string, @Query('req_id') req_id: string) {
        return this.requestsService.getSpecialistOne(spec_id, req_id);
    }

    @Roles(Role.ADMIN, Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Get('/customer/filtered')
    getCustomerFiltered(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getCustomerFiltered(id, pattern);
    }

    @Roles(Role.ADMIN, Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Get('/customer/filtered-by-theme')
    getCustomerFilteredByTheme(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getCustomerFilteredByTheme(id, pattern);
    }

    @Roles(Role.ADMIN, Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Get('/customer/filtered-by-registration-date')
    getCustomerFilteredByRegistrationDate(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getCustomerFilteredByRegistrationDate(id, pattern);
    }

    @Roles(Role.ADMIN, Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Get('/customer/filtered-by-status')
    getCustomerFilteredByStatus(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getCustomerFilteredByStatus(id, pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-theme')
    getFilteredByTheme(@Query('pattern') pattern: string) {
        return this.requestsService.getFilteredByTheme(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-priority')
    getFilteredByPriority(@Query('pattern') pattern: string) {
        return this.requestsService.getFilteredByPriority(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-planned-date')
    getFilteredByPlannedDate(@Query('pattern') pattern: string) {
        return this.requestsService.getFilteredByPlannedDate(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-registration-date')
    getFilteredByRegistrationDate(@Query('pattern') pattern: string) {
        return this.requestsService.getFilteredByRegistrationDate(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-status')
    getFilteredByStatus(@Query('pattern') pattern: string) {
        return this.requestsService.getFilteredByStatus(pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered')
    getFiltered(@Query('pattern') pattern: string) {
        return this.requestsService.getFiltered(pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered-by-theme')
    getSpecialistFilteredByTheme(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFilteredByTheme(id, pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered-by-priority')
    getSpecialistFilteredByPriority(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFilteredByPriority(id, pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered-by-planned-date')
    getSpecialistFilteredByPlannedDate(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFilteredByPlannedDate(id, pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered-by-registration-date')
    getSpecialistFilteredByRegistrationDate(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFilteredByRegistrationDate(id, pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered-by-status')
    getSpecialistFilteredByStatus(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFilteredByStatus(id, pattern);
    }

    @Roles(Role.ADMIN, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/specialist/filtered')
    getSpecialistFiltered(@Query('id') id: string, @Query('pattern') pattern: string) {
        return this.requestsService.getSpecialistFiltered(id, pattern);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put('/change-status')
    changeStatus(@Body() updateStatusDto: UpdateStatusDto) {
        return this.requestsService.updateStatus(updateStatusDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put('/change-priority')
    changePriority(@Body() updatePriorityDto: UpdatePriorityDto) {
        return this.requestsService.updatePriority(updatePriorityDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put('/change-controller')
    changeController(@Body() updateControllerDto: UpdateControllerDto) {
        return this.requestsService.updateController(updateControllerDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put('/change-executor')
    changeExecutor(@Body() updateExecutorDto: UpdateExecutorDto) {
        return this.requestsService.updateExecutor(updateExecutorDto);
    }
}
