import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CustomerModel } from "./customers/customers.model";
import { CustomersModule } from './customers/customers.module';
import { RolesModule } from './roles/roles.module';
import { RoleModel } from "./roles/roles.model";
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { AppealsModule } from './appeals/appeals.module';
import { AppealStatusesModule } from './appeal-statuses/appeal-statuses.module';
import { RequestPrioritiesModule } from './request-priorities/request-priorities.module';
import { RequestTypesModule } from './request-types/request-types.module';
import { RequestStatusesModule } from './request-statuses/request-statuses.module';
import { AppealStatusModel } from "./appeal-statuses/appeal-statuses.model";
import { AppealModel } from "./appeals/appeals.model";
import { EmployeeModel } from "./employees/employees.model";
import { RequestPriorityModel } from "./request-priorities/request-priorities.model";
import { RequestStatusModel } from "./request-statuses/request-statuses.model";
import { RequestTypeModel } from "./request-types/request-types.model";
import { RequestsModule } from './requests/requests.module';
import { UserCustomerMessagesModule } from './user-customer-messages/user-customer-messages.module';
import { UserInnerMessagesModule } from './user-inner-messages/user-inner-messages.module';
import { UserCustomerMessageModel } from "./user-customer-messages/user-customer-messages.model";
import { UserInnerMessageModel } from "./user-inner-messages/user-inner-messages.model";
import { RequestModel } from "./requests/requests.model";
import { FilesModule } from './files/files.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';

@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTRGRES_DB,
            models: [
                CustomerModel, 
                RoleModel,
                AppealStatusModel,
                AppealModel,
                EmployeeModel,
                RequestPriorityModel,
                RequestStatusModel,
                RequestTypeModel,
                RequestModel,
                UserCustomerMessageModel,
                UserInnerMessageModel
            ],
            autoLoadModels: true
        }),
        CustomersModule,
        RolesModule,
        AuthModule,
        EmployeesModule,
        AppealsModule,
        AppealStatusesModule,
        RequestPrioritiesModule,
        RequestTypesModule,
        RequestStatusesModule,
        RequestsModule,
        UserCustomerMessagesModule,
        UserInnerMessagesModule,
        FilesModule,
        KnowledgeBaseModule,
    ]
})

export class AppModule {}