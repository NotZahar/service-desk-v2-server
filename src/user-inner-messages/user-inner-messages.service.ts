import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { CreateUserInnerMessageDto } from './dto/create-user-inner-message.dto';
import { UserInnerMessageModel } from './user-inner-messages.model';

@Injectable()
export class UserInnerMessagesService {
    constructor(@InjectModel(UserInnerMessageModel) private userInnerRepository: typeof UserInnerMessageModel) {}

    async createMessage(createUserInnerMessageDto: CreateUserInnerMessageDto) {
        const createObj = {
            date: new Date(),
            file: createUserInnerMessageDto.file,
            text: createUserInnerMessageDto.text,
            employee_id: createUserInnerMessageDto.employee_id,
            request_id: createUserInnerMessageDto.request_id
        }

        await this.userInnerRepository.create(createObj);
    }

    async getAll(request_id: string) {
        const messages = await UserInnerMessageModel.sequelize?.query(`
        SELECT 
            messages.id, 
            messages.date, 
            messages.file, 
            messages.text, 
            messages.employee_id, 
            messages.request_id, 
            employees.first_name as user_name, 
            employees.email as user_email
            
            FROM "user-inner-messages" as messages	
            JOIN employees ON messages.employee_id=employees.id
            JOIN requests ON messages.request_id=requests.id
            WHERE messages.request_id='${request_id}'
            ORDER BY messages.date ASC`, { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        return messages;
    }
}
