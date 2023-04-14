import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleModel } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModel } from 'src/customers/customers.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([RoleModel, CustomerModel])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
