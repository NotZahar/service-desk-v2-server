import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModel } from './employees.model';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [
    SequelizeModule.forFeature([EmployeeModel]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule)
  ],
  exports: [EmployeesService]
})
export class EmployeesModule {}
