import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppealStatusesModule } from 'src/appeal-statuses/appeal-statuses.module';
import { AuthModule } from 'src/auth/auth.module';
import { AppealsController } from './appeals.controller';
import { AppealModel } from './appeals.model';
import { AppealsService } from './appeals.service';

@Module({
  controllers: [AppealsController],
  providers: [AppealsService],
  imports: [
    SequelizeModule.forFeature([AppealModel]),
    forwardRef(() => AuthModule),
    AppealStatusesModule
  ],
  exports: [
    AppealsService
  ]
})
export class AppealsModule {}
