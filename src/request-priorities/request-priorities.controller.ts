import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestPriorityDto } from './dto/create-request-priorities.dto';
import { RequestPrioritiesService } from './request-priorities.service';

@Controller('request-priorities')
export class RequestPrioritiesController {
    constructor(private requestPrioritiesService: RequestPrioritiesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRequestPriorityDto: CreateRequestPriorityDto) {
        return this.requestPrioritiesService.createRequestPriority(createRequestPriorityDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.requestPrioritiesService.getAll();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.requestPrioritiesService.getRequestPriorityByName(name);
    }
}
