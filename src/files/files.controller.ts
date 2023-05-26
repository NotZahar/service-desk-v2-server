import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateDirDto } from './dto/create-dir.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { GetDirContentDto } from './dto/get-dir-content.dto';
import { GetFileContentDto } from './dto/get-file-content.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/file-content')
    getFileContent(@Body() getFileContentDto: GetFileContentDto) {
        return this.filesService.getFileContent(getFileContentDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Post('/dir-content')
    getDirContent(@Body() getDirContentDto: GetDirContentDto) {
        return this.filesService.getDirContent(getDirContentDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/file')
    createFile(@Body() createFileDto: CreateFileDto) {
        return this.filesService.createFile(createFileDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post('/dir')
    createDir(@Body() createDirDto: CreateDirDto) {
        return this.filesService.createDir(createDirDto);
    }
}
