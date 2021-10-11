import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  StoreDeveloperParams,
  EditDeveloperParams,
} from './shared/DeveloperParams';
import Provider from './Provider';
import { Developer } from '../../entities/Developer';

@Controller('developers')
export class DevelopersController {
  constructor(private developerProvider: Provider) {}

  @Get()
  async index(): Promise<Array<Developer>> {
    return this.developerProvider.index();
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<Developer> {
    return this.developerProvider.show(id);
  }

  @Post()
  async store(@Body() body: StoreDeveloperParams): Promise<Developer> {
    return this.developerProvider.store(body);
  }

  @Put(':id')
  async edit(
    @Param('id') id: number,
    @Body() body: EditDeveloperParams,
  ): Promise<Developer> {
    return this.developerProvider.edit(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.developerProvider.delete(id);
  }
}
