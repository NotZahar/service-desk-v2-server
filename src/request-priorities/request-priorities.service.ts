import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestPriorityDto } from './dto/create-request-priorities.dto';
import { RequestPriorityModel } from './request-priorities.model';

@Injectable()
export class RequestPrioritiesService {
    constructor(@InjectModel(RequestPriorityModel) private requestPriorityRepository: typeof RequestPriorityModel) {}

    async createRequestPriority(createRequestPriorityDto: CreateRequestPriorityDto) {
        await this.requestPriorityRepository.create(createRequestPriorityDto);
    }

    async getRequestPriorityByName(name: string): Promise<RequestPriorityModel | null> {
        const requestPriority = await this.requestPriorityRepository.findOne({ where: { name } });
        return requestPriority;
    }
}
