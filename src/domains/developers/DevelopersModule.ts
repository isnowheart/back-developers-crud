import { Module } from '@nestjs/common';
import { DevelopersController } from './DevelopersController';
import Provider  from './Provider';

@Module({
  controllers: [DevelopersController],
  providers: [Provider],
})
export class DevelopersModule {}
