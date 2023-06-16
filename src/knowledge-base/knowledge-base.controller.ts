import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateFileDto } from './dto/create-file.dto';
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

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Get('/file')
    getFileData(@Query('path') path: string) {
        return this.knowledgeBaseService.getFileData(path);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/contracts')
    getContracts() {
        return this.knowledgeBaseService.getContracts();
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.MANAGER, Role.SPECIALIST)
    @UseGuards(RolesGuard)
    @Post('/file')
    createFile(@Body() createFileDto: CreateFileDto) {
        return this.knowledgeBaseService.createFile(createFileDto);
    }
}
