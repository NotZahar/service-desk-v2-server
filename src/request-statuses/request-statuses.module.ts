import { forwardRef, Module } from '@nestjs/common';
import { RequestStatusesService } from './request-statuses.service';
import { RequestStatusesController } from './request-statuses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RequestStatusModel } from './request-statuses.model';

@Module({
  providers: [RequestStatusesService],
  controllers: [RequestStatusesController],
  imports: [
    SequelizeModule.forFeature([RequestStatusModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RequestStatusesService
  ]
})
export class RequestStatusesModule {}
