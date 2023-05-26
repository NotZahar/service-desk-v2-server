import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import { pathToFileStorage } from './main-paths';
import * as fs from 'fs';
import { FilesErrorMessage } from 'src/errors/files-errors';
import { GetFileContentDto } from './dto/get-file-content.dto';
import { CreateFileDto } from './dto/create-file.dto';
import { CreateDirDto } from './dto/create-dir.dto';
import { GetDirContentDto } from './dto/get-dir-content.dto';

@Injectable()
export class FilesService {
    
    async getFileContent(getFileContentDto: GetFileContentDto) {
        try {
            const filePath = path.resolve(__dirname, pathToFileStorage, getFileContentDto.filePath);

            if (fs.statSync(filePath).isDirectory()) {
                throw new HttpException(FilesErrorMessage.NotFile, HttpStatus.BAD_REQUEST);
            }
            
            return fs.readFileSync(filePath);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw new HttpException(err.getResponse(), err.getStatus());
            throw new HttpException(FilesErrorMessage.ReadFileError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDirContent(getDirContentDto: GetDirContentDto) {
        try {
            const dirPath = path.resolve(__dirname, pathToFileStorage, getDirContentDto.dirPath);

            if (!fs.statSync(dirPath).isDirectory()) {
                throw new HttpException(FilesErrorMessage.NotDir, HttpStatus.BAD_REQUEST);
            }
            
            return fs.readdirSync(dirPath);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw new HttpException(err.getResponse(), err.getStatus());
            throw new HttpException(FilesErrorMessage.ReadDirError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFile(createFileDto: CreateFileDto) {
        const { folderPath, fileName, data } = createFileDto;

        try {
            const parentFolderPath = path.resolve(__dirname, pathToFileStorage, folderPath);
            
            if (fs.existsSync(path.join(parentFolderPath, fileName))) {
                throw new HttpException(FilesErrorMessage.FileAlreadyExists, HttpStatus.BAD_REQUEST);
            }

            if (!fs.existsSync(parentFolderPath)) {
                fs.mkdirSync(parentFolderPath, { recursive: true });
            }

            fs.writeFileSync(path.join(parentFolderPath, fileName), data);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw new HttpException(err.getResponse(), err.getStatus());
            throw new HttpException(FilesErrorMessage.CreateFileError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createDir(createDirDto: CreateDirDto) {
        const { parentFolderPath, folderName } = createDirDto;
        
        try {
            fs.mkdirSync(path.resolve(__dirname, pathToFileStorage, parentFolderPath, folderName));
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) throw new HttpException(err.getResponse(), err.getStatus());
            throw new HttpException(FilesErrorMessage.CreateDirError, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
