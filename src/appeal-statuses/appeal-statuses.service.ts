import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppealStatusModel } from './appeal-statuses.model';
import { CreateAppealStatusDto } from './dto/create-appeal-status.dto';

@Injectable()
export class AppealStatusesService {
    constructor(@InjectModel(AppealStatusModel) private appealStatusRepository: typeof AppealStatusModel) {}

    async createAppealStatus(dto: CreateAppealStatusDto) {
        await this.appealStatusRepository.create(dto);
    }

    async getAppealStatusByName(name: string): Promise<AppealStatusModel | null> {
        const appealStatus = await this.appealStatusRepository.findOne({ where: { name } });
        return appealStatus;
    }
}
