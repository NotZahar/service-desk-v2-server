import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserInnerMessagesController } from './user-inner-messages.controller';
import { UserInnerMessageModel } from './user-inner-messages.model';
import { UserInnerMessagesService } from './user-inner-messages.service';

@Module({
  controllers: [UserInnerMessagesController],
  providers: [UserInnerMessagesService],
  imports: [
    SequelizeModule.forFeature([UserInnerMessageModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UserInnerMessagesService
  ]
})
export class UserInnerMessagesModule {}
