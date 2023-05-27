import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppealsModule } from 'src/appeals/appeals.module';
import { AuthModule } from 'src/auth/auth.module';
import { CustomersModule } from 'src/customers/customers.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { RequestPrioritiesModule } from 'src/request-priorities/request-priorities.module';
import { RequestStatusesModule } from 'src/request-statuses/request-statuses.module';
import { RequestTypesModule } from 'src/request-types/request-types.module';
import { RequestsController } from './requests.controller';
import { RequestModel } from './requests.model';
import { RequestsService } from './requests.service';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [
    SequelizeModule.forFeature([RequestModel]),
    EmployeesModule,
    forwardRef(() => CustomersModule),
    RequestPrioritiesModule,
    RequestStatusesModule,
    RequestTypesModule,
    AppealsModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    RequestsService
  ]
})
export class RequestsModule {}
