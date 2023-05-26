import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';

const baseFolder: string = 'knowledge-base';
const baseContractsFolder: string = `${baseFolder}/Договоры`;

@Injectable()
export class KnowledgeBaseService {
    constructor(private filesService: FilesService) {}

    async getContracts() {
        return await this.filesService.getDirContent({ dirPath: baseContractsFolder });
    }
}
