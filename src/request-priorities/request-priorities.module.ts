import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RequestPrioritiesController } from './request-priorities.controller';
import { RequestPriorityModel } from './request-priorities.model';
import { RequestPrioritiesService } from './request-priorities.service';

@Module({
  controllers: [RequestPrioritiesController],
  providers: [RequestPrioritiesService],
  imports: [
    SequelizeModule.forFeature([RequestPriorityModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RequestPrioritiesService
  ]
})
export class RequestPrioritiesModule {}
