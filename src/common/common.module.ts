import { Module } from '@nestjs/common';
import { SlugService } from './providers/slug.servcie';


@Module({
  providers: [SlugService],
  exports: [SlugService], 
})
export class CommonModule {}
