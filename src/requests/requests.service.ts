import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
