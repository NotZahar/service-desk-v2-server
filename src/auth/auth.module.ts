import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from 'src/customers/customers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authConfig } from './auth-config';
import { EmployeesModule } from 'src/employees/employees.module';
import { AppealsModule } from 'src/appeals/appeals.module';
import { AppealStatusesModule } from 'src/appeal-statuses/appeal-statuses.module';
import { RequestPrioritiesModule } from 'src/request-priorities/request-priorities.module';
import { RequestStatusesModule } from 'src/request-statuses/request-statuses.module';
import { RequestTypesModule } from 'src/request-types/request-types.module';
import { RequestsModule } from 'src/requests/requests.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserCustomerMessagesModule } from 'src/user-customer-messages/user-customer-messages.module';
import { UserInnerMessagesModule } from 'src/user-inner-messages/user-inner-messages.module';
import { FilesModule } from 'src/files/files.module';
import { KnowledgeBaseModule } from 'src/knowledge-base/knowledge-base.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => CustomersModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => AppealsModule),
    forwardRef(() => AppealStatusesModule),
    forwardRef(() => RequestPrioritiesModule),
    forwardRef(() => RequestStatusesModule),
    forwardRef(() => RequestTypesModule),
    forwardRef(() => RequestsModule),
    forwardRef(() => RolesModule),
    forwardRef(() => UserCustomerMessagesModule),
    forwardRef(() => UserInnerMessagesModule),
    forwardRef(() => FilesModule),
    forwardRef(() => KnowledgeBaseModule),
    JwtModule.register({
      secret: authConfig.SECRET,
      signOptions: {
        expiresIn: authConfig.TOKEN_EXPIRE_TIME
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
