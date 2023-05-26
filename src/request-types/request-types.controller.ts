import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestTypeDto } from './dto/create-request-types.dto';
import { RequestTypesService } from './request-types.service';

@Controller('request-types')
export class RequestTypesController {
    constructor(private requestTypesService: RequestTypesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRequestTypeDto: CreateRequestTypeDto) {
        return this.requestTypesService.createRequestType(createRequestTypeDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.requestTypesService.getRequestTypeByName(name);
    }
}
