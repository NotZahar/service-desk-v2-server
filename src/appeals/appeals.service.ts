import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppealModel } from './appeals.model';
import { CreateAppealDto } from './dto/create-appeal.dto';

@Injectable()
export class AppealsService {
    constructor(
        @InjectModel(AppealModel) private appealRepository: typeof AppealModel) {}

    async createAppeal(createAppealDto: CreateAppealDto) {
        await this.appealRepository.create({ ...createAppealDto });
    }

    async getAllAppeals() {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name" 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByTheme(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name" 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            WHERE theme ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByDate(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name" 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            WHERE date::VARCHAR ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFilteredByStatus(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name" 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            WHERE "appeal-statuses".name ILIKE '%${pattern}%'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getFiltered(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT appeals.id as "id", theme, text, file, customer_id, date, status_id, "appeal-statuses".name as "status_name" 
            FROM appeals 
            JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id 
            WHERE (theme ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR ("appeal-statuses".name ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }
}
