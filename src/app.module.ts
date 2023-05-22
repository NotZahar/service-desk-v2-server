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

@Module({
    controllers: [],
    providers: [],
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
            models: [CustomerModel, RoleModel],
            autoLoadModels: true
        }),
        CustomersModule,
        RolesModule,
        AuthModule,
        EmployeesModule,
        AppealsModule,
        AppealStatusesModule,
    ]
})

export class AppModule {}