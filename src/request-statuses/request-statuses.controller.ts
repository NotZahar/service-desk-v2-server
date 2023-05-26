import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestStatusDto } from './dto/create-request-statuses.dto';
import { RequestStatusesService } from './request-statuses.service';

@Controller('request-statuses')
export class RequestStatusesController {
    constructor(private requestStatusesService: RequestStatusesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRequestStatusDto: CreateRequestStatusDto) {
        return this.requestStatusesService.createRequestStatus(createRequestStatusDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.requestStatusesService.getAll();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.requestStatusesService.getRequestStatusByName(name);
    }
}
