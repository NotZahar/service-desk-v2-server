import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/roles/roles-list';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
    constructor(private requestsService: RequestsService) {}

    @Roles(Role.DISPATCHER)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createRequestDto: CreateRequestDto) {
        return this.requestsService.createRequest(createRequestDto);
    }
}
