import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { StatsErrorMessage } from 'src/errors/stats-errors';
import { RequestStatus } from 'src/request-statuses/request-statuses-list';
import { RequestsService } from 'src/requests/requests.service';
import { IRequest } from 'src/types/models/request';
import { IRequestStats } from 'src/types/models/stats';

@Injectable()
export class StatsService {
    constructor(private requestsService: RequestsService) {}

    async getStats() {
        const rawRequests = await this.requestsService.getAll();
        if (!rawRequests) throw new Error(StatsErrorMessage.NoData);
        const requests = rawRequests as IRequest[];  
        const successRequests = requests.filter(req => req.status_name === RequestStatus.SUCCESSFULLY_CLOSED);
        const failedRequests = requests.filter(req => req.status_name === RequestStatus.FAILED);
        const atWorkRequests = requests.filter(req => req.status_name === RequestStatus.AT_WORK);


        let timeSpentOnSolvingSuccessRequests = 0;
        for (const req of successRequests) {
            timeSpentOnSolvingSuccessRequests += req.finish_date.getTime() - req.date.getTime();
        }
        const milliseconds = timeSpentOnSolvingSuccessRequests / successRequests.length;
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        const averageExecutionTime = `${minutes.toFixed(2)} мин.`;


        let successPercentage: number[] = [];
        let failedPercentage: number[] = [];
        let atWorkPercentage: number[] = [];
        let days: Date[] = [];
        const observationPeriodInDays = 89;
        const todayDate = new Date();
        const observationStartDate = addDays(todayDate, -observationPeriodInDays);
        let observationData: { 
            date: Date; 
            successReqs: number;
            failedReqs: number;
            atWorkReqs: number;
            reqs: IRequest[] 
        }[] = [];
        
        for (let date = observationStartDate; date <= todayDate; date = addDays(date, 1)) {
            observationData.push({ 
                date: date,
                successReqs: 0,
                failedReqs: 0,  
                atWorkReqs: 0,  
                reqs: [] });
        }

        // find first req < observationStartDate
        let reqIndex = 0;
        for (reqIndex; reqIndex < requests.length; reqIndex++) {
            if (requests[reqIndex].date < observationStartDate) {
                break;
            }
        }

        // distribution
        for (let i = reqIndex - 1; i >= 0; i--) { 
            for (let j = 0; j < observationData.length; j++) {
                if (requests[i].date <= observationData[j].date) {
                    observationData[j].reqs.push(requests[i]);
                    break;
                }
            }
        }

        for (const data of observationData) {
            for (const req of data.reqs) {
                if (req.status_name === RequestStatus.SUCCESSFULLY_CLOSED) {
                    data.successReqs += 1;
                } else if (req.status_name === RequestStatus.FAILED) {
                    data.failedReqs += 1;
                } else if (req.status_name === RequestStatus.AT_WORK) {
                    data.atWorkReqs += 1;
                }
            }

            days.push(data.date);
            successPercentage.push(data.reqs.length ? (data.successReqs / data.reqs.length) * 100 : 0);
            failedPercentage.push(data.reqs.length ? (data.failedReqs / data.reqs.length) * 100 : 0);
            atWorkPercentage.push(data.reqs.length ? (data.atWorkReqs / data.reqs.length) * 100 : 0);
        }


        const requestStats: IRequestStats = {
            all: requests.length,
            success: { 
                all: successRequests.length, 
                percentage: +((successRequests.length / requests.length) * 100).toFixed(2)
            },
            failed: {
                all: failedRequests.length,
                percentage: +((failedRequests.length / requests.length) * 100).toFixed(2)
            },
            atWork: {
                all: atWorkRequests.length,
                percentage: +((atWorkRequests.length / requests.length) * 100).toFixed(2)
            },
            averageTime: averageExecutionTime,
            successPercentage: successPercentage,
            failedPercentage: failedPercentage,
            atWorkPercentage: atWorkPercentage,
            days: days
        };

        return requestStats;
    }
}
