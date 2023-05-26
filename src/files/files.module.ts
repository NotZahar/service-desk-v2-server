import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    forwardRef(() => AuthModule)
  ],
  exports: [
    FilesService
  ]
})
export class FilesModule {}
