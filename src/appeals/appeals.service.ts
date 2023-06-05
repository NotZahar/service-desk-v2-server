import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppealStatus } from 'src/appeal-statuses/appeal-statuses-list';
import { AppealStatusesService } from 'src/appeal-statuses/appeal-statuses.service';
import { AppealErrorMessage } from 'src/errors/appeal-errors';
import { AppealModel } from './appeals.model';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

const selectColumns = `
    appeals.id as "id", 
    theme, 
    text, 
    file, 
    customer_id, 
    date, 
    status_id, 
    "appeal-statuses".name as "status_name", 
    customers.first_name as "customer_name", 
    customers.email as "customer_email"`;

const joins = `
    JOIN "appeal-statuses" ON appeals.status_id="appeal-statuses".id
    JOIN customers ON appeals.customer_id=customers.id`;

@Injectable()
export class AppealsService {
    constructor(
        @InjectModel(AppealModel) private appealRepository: typeof AppealModel,
        private appealStatusesService: AppealStatusesService) {}

    async createAppeal(createAppealDto: CreateAppealDto) {
        const status = await this.appealStatusesService.getAppealStatusByName(AppealStatus.OPEN);
        if (!status) throw new HttpException(AppealErrorMessage.InternalError, HttpStatus.INTERNAL_SERVER_ERROR);
        await this.appealRepository.create({ ...createAppealDto, status_id: status?.id || '', date: new Date() });
    }

    async getAllAppeals() {
        const appeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByTheme(pattern: string) {
        const filteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
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
            ${joins}
            
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
            ${joins}
            
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
            ${joins}
            
            WHERE (theme ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR ("appeal-statuses".name ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return filteredAppeals;
    }

    async getCustomerAllAppeals(id: string) {
        const customerAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            WHERE appeals.customer_id='${id}'
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return customerAppeals;
    }

    async getCustomerFilteredByTheme(id: string, pattern: string) {
        const customerFilteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            WHERE (appeals.customer_id='${id}') AND (theme ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return customerFilteredAppeals;
    }

    async getCustomerFilteredByDate(id: string, pattern: string) { 
        const customerFilteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            WHERE (appeals.customer_id='${id}') AND (date::VARCHAR ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return customerFilteredAppeals;
    }

    async getCustomerFilteredByStatus(id: string, pattern: string) {
        const customerFilteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            WHERE (appeals.customer_id='${id}') AND ("appeal-statuses".name ILIKE '%${pattern}%')
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return customerFilteredAppeals;
    }

    async getCustomerFiltered(id: string, pattern: string) {
        const customerFilteredAppeals = await AppealModel.sequelize?.query(
            `SELECT ${selectColumns}

            FROM appeals 
            ${joins}
            
            WHERE (appeals.customer_id='${id}') AND (
                (theme ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR ("appeal-statuses".name ILIKE '%${pattern}%')
            )
            ORDER BY date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return customerFilteredAppeals;
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
