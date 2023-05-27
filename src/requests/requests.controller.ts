import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestDto } from './dto/create-request.dto';
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

    // @Roles(Role.ADMIN, Role.DISPATCHER)
    // @UseGuards(RolesGuard)
    // @Put('/change-status')
    // changeStatus(@Body() updateStatusDto: UpdateStatusDto) {
    //     return this.appealsService.updateStatus(updateStatusDto);
    // }
}
