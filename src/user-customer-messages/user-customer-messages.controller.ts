import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateUserCustomerMessageDto } from './dto/create-user-customer-message.dto';
import { UserCustomerMessagesService } from './user-customer-messages.service';

@Controller('user-customer-messages')
export class UserCustomerMessagesController {
    constructor(private userCustomerMessagesService: UserCustomerMessagesService) {}

    @Roles(Role.CUSTOMER, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createCustomerMessageDto: CreateUserCustomerMessageDto) {
        return this.userCustomerMessagesService.createMessage(createCustomerMessageDto);
    }

    @Roles(Role.CUSTOMER, Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Get('/:request_id')
    getAll(@Param('request_id') request_id: string) {
        return this.userCustomerMessagesService.getAll(request_id);
    }
}
