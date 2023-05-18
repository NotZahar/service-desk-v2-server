import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { EmployeeModel } from './employees.model';
import { RoleModel } from 'src/roles/roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [
    SequelizeModule.forFeature([EmployeeModel, RoleModel]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [EmployeesService]
})
export class EmployeesModule {}
