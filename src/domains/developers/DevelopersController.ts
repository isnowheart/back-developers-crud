import { Controller } from '@nestjs/common';
import Provider from './Provider';

@Controller('developers')
export class DevelopersController {
  constructor(private developerProvider: Provider) {}
}
