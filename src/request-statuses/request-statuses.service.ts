import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestStatusDto } from './dto/create-request-statuses.dto';
import { RequestStatusModel } from './request-statuses.model';

@Injectable()
export class RequestStatusesService {
    constructor(@InjectModel(RequestStatusModel) private requestStatusRepository: typeof RequestStatusModel) {}

    async createRequestStatus(createRequestStatusDto: CreateRequestStatusDto) {
        await this.requestStatusRepository.create(createRequestStatusDto);
    }

    async getAll() {
        const statuses = await this.requestStatusRepository.findAll();
        return statuses;
    }

    async getRequestStatusByName(name: string): Promise<RequestStatusModel | null> {
        const requestStatus = await this.requestStatusRepository.findOne({ where: { name } });
        return requestStatus;
    }
}
