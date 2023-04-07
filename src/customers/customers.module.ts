import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersController } from './customers.controller';
import { CustomerModel } from './customers.model';
import { CustomersService } from './customers.service';
import { RoleModel } from 'src/roles/roles.model';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([CustomerModel, RoleModel])
  ]
})
export class CustomersModule {}
