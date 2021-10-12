import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import {
  StoreDeveloperParams,
  EditDeveloperParams
} from './shared/DeveloperParams';
import { Developer } from '../../entities/Developer';
import Validation from './shared/Validation'
@Injectable()
export default class Provider {
  async index(): Promise<Array<Developer>> {
    const developerList = await Developer.find();
    return developerList;
  }

  async show(id: number): Promise<Developer> {
    try {
      const getDeveloper = await Developer.findOneOrFail(id);
      return getDeveloper;
    } catch (e) {
      throw new NotFoundException('Developer not found.');
    }
  }

  async store(body: StoreDeveloperParams): Promise<Developer> {
    try {
      const newDeveloper = Developer.create({ ...body });
      Validation.store(newDeveloper)
      await newDeveloper.save();
      return newDeveloper;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async edit(id: number, body: EditDeveloperParams): Promise<Developer> {
    const updateDeveloper = await Developer.findOne(id);
    if (!updateDeveloper) throw new NotFoundException('Developer not found.');
    try {
      updateDeveloper.setAttributes(body);
      Validation.edit(updateDeveloper)
      await updateDeveloper.save();
      return updateDeveloper;
    } catch (e) {
      throw new HttpException(e,404);
    }
  }

  async delete(id: number): Promise<void> {
    const deleteDeveloper = await Developer.findOne(id);
    if (!deleteDeveloper) throw new NotFoundException('Developer not found.');
    try {
      await deleteDeveloper.remove();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
