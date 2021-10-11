import { Module } from '@nestjs/common';
import { DevelopersModule } from './domains/developers/DevelopersModule';

@Module({
  imports: [DevelopersModule],
})
export class AppModule {}
