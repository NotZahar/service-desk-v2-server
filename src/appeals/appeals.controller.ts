import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { AppealsService } from './appeals.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('appeals')
export class AppealsController {
    constructor(private appealsService: AppealsService) {}

    @Roles(Role.CUSTOMER)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createAppealDto: CreateAppealDto) {
        return this.appealsService.createAppeal(createAppealDto);
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.appealsService.getAllAppeals();
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-theme')
    getFilteredByTheme(@Query('pattern') pattern: string) {
        return this.appealsService.getFilteredByTheme(pattern);
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-date')
    getFilteredByDate(@Query('pattern') pattern: string) {
        return this.appealsService.getFilteredByDate(pattern);
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered-by-status')
    getFilteredByStatus(@Query('pattern') pattern: string) {
        return this.appealsService.getFilteredByStatus(pattern);
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/filtered')
    getFiltered(@Query('pattern') pattern: string) {
        return this.appealsService.getFiltered(pattern);
    }

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Put('/change-status')
    changeStatus(@Body() updateStatusDto: UpdateStatusDto) {
        return this.appealsService.updateStatus(updateStatusDto);
    }
}
