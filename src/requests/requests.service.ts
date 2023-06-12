import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { AppealStatus } from 'src/appeal-statuses/appeal-statuses-list';
import { AppealsService } from 'src/appeals/appeals.service';
import { CustomersService } from 'src/customers/customers.service';
import { EmployeesService } from 'src/employees/employees.service';
import { RequestErrorMessage } from 'src/errors/request-errors copy';
import { RequestPriority, requestPriorityType } from 'src/request-priorities/request-priorities-list';
import { RequestPrioritiesService } from 'src/request-priorities/request-priorities.service';
import { RequestStatus, requestStatusType } from 'src/request-statuses/request-statuses-list';
import { RequestStatusesService } from 'src/request-statuses/request-statuses.service';
import { RequestType, requestTypeType } from 'src/request-types/request-types-list';
import { RequestTypesService } from 'src/request-types/request-types.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { UpdateExecutorDto } from './dto/update-executor.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
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
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
        
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getCustomerAll(id: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
        
            WHERE customer_id='${id}'
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getSpecialistAll(id: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
        
            WHERE (controller_id='${id}') OR (executor_id='${id}')
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getSpecialistOne(spec_id: string, req_id: string) {
        const request = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
        
            WHERE requests.id='${req_id}' AND (controller_id='${spec_id}' OR executor_id='${spec_id}')
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return request;
    }

    async getFilteredByTheme(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE theme ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getFilteredByPriority(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE priorities.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getFilteredByPlannedDate(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE planned_date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getFilteredByRegistrationDate(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getFilteredByStatus(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE statuses.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getFiltered(pattern: string) {
        const requests = await RequestModel.sequelize?.query(
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
        return requests;
    }

    async getCustomerFilteredByTheme(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (customer_id='${id}') AND (theme ILIKE '%${pattern}%')
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getCustomerFilteredByRegistrationDate(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (customer_id='${id}') AND (date::VARCHAR ILIKE '%${pattern}%')
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getCustomerFilteredByStatus(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (customer_id='${id}') AND (statuses.name ILIKE '%${pattern}%')
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getCustomerFiltered(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (customer_id='${id}') AND (
                (theme ILIKE '%${pattern}%')
                OR (date::VARCHAR ILIKE '%${pattern}%')
                OR (statuses.name ILIKE '%${pattern}%')
            )
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return requests;
    }

    async getSpecialistFilteredByTheme(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}') 
                AND theme ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getSpecialistFilteredByPriority(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}')
                AND priorities.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getSpecialistFilteredByPlannedDate(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}')
                AND planned_date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getSpecialistFilteredByRegistrationDate(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}')
                AND date::VARCHAR ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getSpecialistFilteredByStatus(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}')
                AND statuses.name ILIKE '%${pattern}%'
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
    }

    async getSpecialistFiltered(id: string, pattern: string) {
        const requests = await RequestModel.sequelize?.query(
            `SELECT 
            ${selectColumns}
         
            FROM requests
            ${joins}
            
            WHERE (controller_id='${id}' OR executor_id='${id}')
                AND (
                    (theme ILIKE '%${pattern}%')
                    OR (priorities.name ILIKE '%${pattern}%')
                    OR (planned_date::VARCHAR ILIKE '%${pattern}%')
                    OR (date::VARCHAR ILIKE '%${pattern}%')
                    OR (statuses.name ILIKE '%${pattern}%')
                ) 
            
            ORDER BY requests.date DESC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );
        return requests;
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

    async updateStatus(updateStatusDto: UpdateStatusDto) {
        const newStatus = await this.requestStatusesService.getRequestStatusByName(updateStatusDto.status_name);
        if (!newStatus) throw new HttpException(RequestErrorMessage.RequestStatusNotFound, HttpStatus.BAD_REQUEST);
        
        const finish_date = new Date();

        await this.requestRepository.update({ 
                status_id: newStatus.id,
                finish_date: finish_date
            },
            { where: { id: updateStatusDto.id }}
        );
        
        if (updateStatusDto.appeal_id && updateStatusDto.status_name !== RequestStatus.AT_WORK) {
            await this.appealsService.updateStatus({ id: updateStatusDto.appeal_id, status_name: AppealStatus.CLOSED });
        }

        return { status_id: newStatus.id, status_name: newStatus.name, finish_date: finish_date };
    }

    async updatePriority(updatePriorityDto: UpdatePriorityDto) {
        const newPriority = await this.requestPrioritiesService.getRequestPriorityByName(updatePriorityDto.priority_name);
        if (!newPriority) throw new HttpException(RequestErrorMessage.RequestPriorityNotFound, HttpStatus.BAD_REQUEST);
        await this.requestRepository.update(
            { priority_id: newPriority.id },
            { where: { id: updatePriorityDto.id }}
        );
    
        return { priority_id: newPriority.id, priority_name: newPriority.name };
    }

    async updateController(updateControllerDto: UpdateControllerDto) {
        const newController = await this.employeesService.getOne(updateControllerDto.controller_id);
        if (!newController) throw new HttpException(RequestErrorMessage.RequestControllerNotFound, HttpStatus.BAD_REQUEST);
        await this.requestRepository.update(
            { controller_id: newController.id },
            { where: { id: updateControllerDto.id }}
        );

        return { 
            controller_id: newController.id,
            controller_name: newController.first_name,
            controller_email: newController.email,
            controller_appointment: newController.appointment
        };
    }

    async updateExecutor(updateExecutorDto: UpdateExecutorDto) {
        const newExecutor = await this.employeesService.getOne(updateExecutorDto.executor_id);
        if (!newExecutor) throw new HttpException(RequestErrorMessage.RequestExecutorNotFound, HttpStatus.BAD_REQUEST);
        await this.requestRepository.update(
            { executor_id: newExecutor.id },
            { where: { id: updateExecutorDto.id }}
        );

        return { 
            executor_id: newExecutor.id,
            executor_name: newExecutor.first_name,
            executor_email: newExecutor.email,
            executor_appointment: newExecutor.appointment
        };
    }
}
