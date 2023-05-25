import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppealStatusesService } from 'src/appeal-statuses/appeal-statuses.service';
import { AppealErrorMessage } from 'src/errors/appeal-errors';
import { AppealModel } from './appeals.model';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

const selectColumns = 'appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name", customers.first_name as "customer_name", customers.email as "customer_email"';

@Injectable()
export class AppealsService {
    constructor(
        @InjectModel(AppealModel) private appealRepository: typeof AppealModel,
        private appealStatusesService: AppealStatusesService) {}

    async createAppeal(createAppealDto: CreateAppealDto) {
        await this.appealRepository.create({ ...createAppealDto });
    }

    async getAllAppeals() {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id
			JOIN customers ON appeals.customer_id=customers.id
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByTheme(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns} 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            JOIN customers ON appeals.customer_id=customers.id
            WHERE theme ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByDate(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns} 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            JOIN customers ON appeals.customer_id=customers.id
            WHERE date::VARCHAR ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByStatus(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns} 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            JOIN customers ON appeals.customer_id=customers.id
            WHERE "appeal-statuses".name ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFiltered(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns} 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            JOIN customers ON appeals.customer_id=customers.id
            WHERE (theme ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR ("appeal-statuses".name ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async updateStatus(updateStatusDto: UpdateStatusDto) {
        const newStatus = await this.appealStatusesService.getAppealStatusByName(updateStatusDto.status_name);
        if (!newStatus) throw new HttpException(AppealErrorMessage.AppealStatusNotFound, HttpStatus.BAD_REQUEST);
        await this.appealRepository.update(
            { status_id: newStatus.id },
            { where: { id: updateStatusDto.id }}
        );
    }
}
