import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppealStatus } from 'src/appeal-statuses/appeal-statuses-list';
import { AppealsService } from 'src/appeals/appeals.service';
import { CustomersService } from 'src/customers/customers.service';
import { EmployeesService } from 'src/employees/employees.service';
import { RequestPriority, requestPriorityType } from 'src/request-priorities/request-priorities-list';
import { RequestPrioritiesService } from 'src/request-priorities/request-priorities.service';
import { RequestStatus, requestStatusType } from 'src/request-statuses/request-statuses-list';
import { RequestStatusesService } from 'src/request-statuses/request-statuses.service';
import { RequestType, requestTypeType } from 'src/request-types/request-types-list';
import { RequestTypesService } from 'src/request-types/request-types.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestModel } from './requests.model';

const selectColumns = `
    requests.id, 
    controller_id, 
    executor_id, 
    priority_id, 
    description, 
    requests.file, 
    agreement, 
    date, 
    appeal_id, 
    theme, 
    type_id, 
    planned_date, 
    status_id, 
    customer_id, 
    finish_date, 
    controllers.first_name as controller_name, 
    controllers.email as controller_email, 
    controllers.appointment as controller_appointment, 
    executors.first_name as executor_name, 
    executors.email as executor_email, 
    executors.appointment as executor_appointment, 
    priorities.name as priority_name, 
    rtypes.name as type_name, 
    statuses.name as status_name,
    customers.first_name as customer_name,
    customers.email as customer_email`;

const joins = `
    JOIN employees as controllers ON requests.controller_id=controllers.id
    JOIN employees as executors ON requests.executor_id=executors.id
    JOIN "request-priorities" as priorities ON requests.priority_id=priorities.id
    JOIN "request-types" as rtypes ON requests.type_id=rtypes.id
    JOIN "request-statuses" as statuses ON requests.status_id=statuses.id
    JOIN customers ON requests.customer_id=customers.id`;

@Injectable()
export class RequestsService {
    constructor(
        @InjectModel(RequestModel) private requestRepository: typeof RequestModel,
        private employeesService: EmployeesService,
        private customersService: CustomersService,
        private requestPrioritiesService: RequestPrioritiesService,
        private requestStatusesService: RequestStatusesService,
        private requestTypesService: RequestTypesService,
        private appealsService: AppealsService) {}
    
    private getEmail(str: string) {
        let email = '';
        const regExp = new RegExp('^.*@.*$');

        str.split(' ').forEach((elem) => {
            if (elem.match(regExp)) {
                email = elem;
            }
        });
    
        return email;
    }

    async getAll() {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
        
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByTheme(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE theme ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByPriority(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE priorities.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByPlannedDate(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE planned_date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByRegistrationDate(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFilteredByStatus(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE statuses.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async getFiltered(pattern: string) {
        const appeals = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (theme ILIKE '%${pattern}%')
                OR (priorities.name ILIKE '%${pattern}%')
                OR (planned_date::VARCHAR ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR (statuses.name ILIKE '%${pattern}%')
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return appeals;
    }

    async createRequest(createRequestDto: CreateRequestDto) {
        const controller = await this.employeesService.getEmployeeByEmail(this.getEmail(createRequestDto.controller));
        const executor = await this.employeesService.getEmployeeByEmail(this.getEmail(createRequestDto.executor));
        const customer = await this.customersService.getCustomerByEmail(this.getEmail(createRequestDto.customer));
        const requestPriority = await this.requestPrioritiesService.getRequestPriorityByName(RequestPriority[createRequestDto.priority as requestPriorityType]);
        const requestType = await this.requestTypesService.getRequestTypeByName(RequestType[createRequestDto.type as requestTypeType]);
        const requestStatus = await this.requestStatusesService.getRequestStatusByName(RequestStatus[createRequestDto.status as requestStatusType]);
        
        const requestObj = {
            controller_id: controller!.id,
            executor_id: executor!.id,
            priority_id: requestPriority!.id,
            description: createRequestDto.description,
            file: createRequestDto.file,
            agreement: createRequestDto.agreement,
            date: new Date(),
            appeal_id: createRequestDto.appeal_id,
            theme: createRequestDto.theme,
            type_id: requestType!.id,
            planned_date: createRequestDto.planned_date,
            status_id: requestStatus!.id,
            customer_id: customer!.id,
            finish_date: null
        };

        await this.requestRepository.create(requestObj);
        if (createRequestDto.appeal_id) await this.appealsService.updateStatus({ id: createRequestDto.appeal_id, status_name: AppealStatus.AT_WORK });
    }
}
