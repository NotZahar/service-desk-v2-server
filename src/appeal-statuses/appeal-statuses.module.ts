import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AppealStatusesController } from './appeal-statuses.controller';
import { AppealStatusModel } from './appeal-statuses.model';
import { AppealStatusesService } from './appeal-statuses.service';

@Module({
  controllers: [AppealStatusesController],
  providers: [AppealStatusesService],
  imports: [
    SequelizeModule.forFeature([AppealStatusModel]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    AppealStatusesService
  ]
})
export class AppealStatusesModule {}
