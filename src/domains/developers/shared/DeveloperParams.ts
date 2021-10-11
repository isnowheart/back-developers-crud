import {  BadRequestException } from '@nestjs/common';

export class StoreDeveloperParams {
  name: string;
  gender: string;
  age: number
  hobby: string;
  birthdate: string;
}

export type EditDeveloperParams = {
  name?: string;
  gender?: string;
  hobby?: string;
  birthdate?: string;
};
