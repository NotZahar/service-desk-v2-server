import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersController } from './customers.controller';
import { CustomerModel } from './customers.model';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([CustomerModel])
  ]
})
export class CustomersModule {}
