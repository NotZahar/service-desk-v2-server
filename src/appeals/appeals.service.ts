import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppealModel } from './appeals.model';
import { CreateAppealDto } from './dto/create-appeal.dto';

@Injectable()
export class AppealsService {
    constructor(
        @InjectModel(AppealModel) private appealRepository: typeof AppealModel) {}

    async createAppeal(createAppealDto: CreateAppealDto) {
        await this.appealRepository.create({ ...createAppealDto });
    }

    async getAllAppeals(): Promise<AppealModel[]> {
        const appeals = await this.appealRepository.findAll();
        return appeals;
    }
}
