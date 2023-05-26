import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RequestTypesController } from './request-types.controller';
import { RequestTypeModel } from './request-types.model';
import { RequestTypesService } from './request-types.service';

@Module({
  controllers: [RequestTypesController],
  providers: [RequestTypesService],
  imports: [
    SequelizeModule.forFeature([RequestTypeModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    RequestTypesService
  ]
})
export class RequestTypesModule {}
