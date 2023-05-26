import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { KnowledgeBaseService } from './knowledge-base.service';

@Module({
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService],
  imports: [
    forwardRef(() => AuthModule),
    FilesModule
  ],
  exports: [KnowledgeBaseService]
})
export class KnowledgeBaseModule {}
