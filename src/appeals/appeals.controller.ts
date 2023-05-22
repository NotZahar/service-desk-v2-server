import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { AppealsService } from './appeals.service';
import { CreateAppealDto } from './dto/create-appeal.dto';

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
}
