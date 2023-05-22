import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersController } from './customers.controller';
import { CustomerModel } from './customers.model';
import { CustomersService } from './customers.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([CustomerModel]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule)
  ],
  exports: [CustomersService]
})
export class CustomersModule {}
