import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RequestsController } from './requests.controller';
import { RequestModel } from './requests.model';
import { RequestsService } from './requests.service';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [
    SequelizeModule.forFeature([RequestModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RequestsService
  ]
})
export class RequestsModule {}
