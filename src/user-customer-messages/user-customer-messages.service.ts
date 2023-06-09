import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { IUserCustomerMessage } from 'src/types/models/user-customer-message';
import { CreateUserCustomerMessageDto } from './dto/create-user-customer-message.dto';
import { UserCustomerMessageModel } from './user-customer-messages.model';

@Injectable()
export class UserCustomerMessagesService {
    constructor(@InjectModel(UserCustomerMessageModel) private userCustomerRepository: typeof UserCustomerMessageModel) {}

    async createMessage(createUserCustomerMessageDto: CreateUserCustomerMessageDto) {
        const createObj = {
            date: new Date(),
            file: createUserCustomerMessageDto.file,
            text: createUserCustomerMessageDto.text,
            employee_id: createUserCustomerMessageDto.employee_id,
            customer_id: createUserCustomerMessageDto.customer_id,
            request_id: createUserCustomerMessageDto.request_id
        }

        await this.userCustomerRepository.create(createObj);
    }

    async getAll(request_id: string) {
        const messages: IUserCustomerMessage[] | undefined = await UserCustomerMessageModel.sequelize?.query(`
        (SELECT 
            messages.id, 
            messages.date, 
            messages.file, 
            messages.text, 
            messages.employee_id, 
            messages.customer_id, 
            messages.request_id, 
            employees.first_name as user_name, 
            employees.email as user_email
            
            FROM "user-customer-messages" as messages	
            JOIN employees ON messages.employee_id=employees.id
            JOIN requests ON messages.request_id=requests.id
            WHERE messages.request_id='${request_id}'
            ORDER BY messages.date ASC)
        UNION ALL
        (SELECT 
            messages.id, 
            messages.date, 
            messages.file, 
            messages.text, 
            messages.employee_id, 
            messages.customer_id, 
            messages.request_id, 
            customers.first_name as user_name, 
            customers.email as user_email
            
            FROM "user-customer-messages" as messages	
            JOIN customers ON messages.customer_id=customers.id
            JOIN requests ON messages.request_id=requests.id
            WHERE messages.request_id='${request_id}'
            ORDER BY messages.date ASC)`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        messages?.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }

            if (a.date > b.date) {
                return 1;
            }

            return 0;
        });

        return messages;
    }
}
