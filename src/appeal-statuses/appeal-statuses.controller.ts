import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { AppealStatusesService } from './appeal-statuses.service';
import { CreateAppealStatusDto } from './dto/create-appeal-status.dto';

@Controller('appeal-statuses')
export class AppealStatusesController {
    constructor(private appealStatusesService: AppealStatusesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createAppealStatusDto: CreateAppealStatusDto) {
        return this.appealStatusesService.createAppealStatus(createAppealStatusDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.appealStatusesService.getAppealStatusByName(name);
    }
}
