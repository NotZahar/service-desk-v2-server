import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('knowledge-base')
export class KnowledgeBaseController {
    constructor(private knowledgeBaseService: KnowledgeBaseService) {}

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get()
    getBase() {
        return this.knowledgeBaseService.getBase();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/contracts')
    getContracts() {
        return this.knowledgeBaseService.getContracts();
    }
}
