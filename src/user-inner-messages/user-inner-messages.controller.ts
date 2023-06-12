import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateUserInnerMessageDto } from './dto/create-user-inner-message.dto';
import { UserInnerMessagesService } from './user-inner-messages.service';

@Controller('user-inner-messages')
export class UserInnerMessagesController {
    constructor(private userInnerMessagesService: UserInnerMessagesService) {}

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createUserInnerMessageDto: CreateUserInnerMessageDto) {
        return this.userInnerMessagesService.createMessage(createUserInnerMessageDto);
    }

    @Roles(Role.ADMIN, Role.DISPATCHER, Role.SPECIALIST, Role.MANAGER)
    @UseGuards(RolesGuard)
    @Get('/:request_id')
    getAll(@Param('request_id') request_id: string) {
        return this.userInnerMessagesService.getAll(request_id);
    }
}
