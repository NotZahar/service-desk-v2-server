import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RequestsModule } from 'src/requests/requests.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [
    forwardRef(() => AuthModule),
    RequestsModule
  ],
  exports: [
    StatsService
  ]
})
export class StatsModule {}
