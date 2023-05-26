import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestTypeDto } from './dto/create-request-types.dto';
import { RequestTypeModel } from './request-types.model';

@Injectable()
export class RequestTypesService {
    constructor(@InjectModel(RequestTypeModel) private requestTypeRepository: typeof RequestTypeModel) {}

    async createRequestType(createRequestTypeDto: CreateRequestTypeDto) {
        await this.requestTypeRepository.create(createRequestTypeDto);
    }

    async getRequestTypeByName(name: string): Promise<RequestTypeModel | null> {
        const requestType = await this.requestTypeRepository.findOne({ where: { name } });
        return requestType;
    }
}
