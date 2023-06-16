import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) {}

    @Roles(Role.ADMIN, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get()
    getStats() {
        return this.statsService.getStats();
    }
}
