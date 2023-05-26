import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserCustomerMessagesController } from './user-customer-messages.controller';
import { UserCustomerMessageModel } from './user-customer-messages.model';
import { UserCustomerMessagesService } from './user-customer-messages.service';

@Module({
  controllers: [UserCustomerMessagesController],
  providers: [UserCustomerMessagesService],
  imports: [
    SequelizeModule.forFeature([UserCustomerMessageModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UserCustomerMessagesService
  ]
})
export class UserCustomerMessagesModule {}
