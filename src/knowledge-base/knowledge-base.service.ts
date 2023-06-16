import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { CreateFileDto } from './dto/create-file.dto';

const baseFolder: string = 'knowledge-base';
const baseContractsFolder: string = `${baseFolder}/Договоры`;

@Injectable()
export class KnowledgeBaseService {
    constructor(private filesService: FilesService) {}

    async getBase() {
        return await this.filesService.getKBaseContent(baseFolder);
    }

    async getFileData(path: string) {
        return await this.filesService.getFileContent({ filePath: baseFolder + path });
    }

    async getContracts() {
        return await this.filesService.getDirContent({ dirPath: baseContractsFolder });
    }

    async createFile(createFileDto: CreateFileDto) {
        const file = {
            folderPath: baseFolder + createFileDto.folderPath,
            fileName: createFileDto.fileName,
            data: createFileDto.content
        };
   
        return await this.filesService.createFile(file);
    }
}
