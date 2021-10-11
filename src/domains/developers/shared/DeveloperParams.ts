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

export function calcAge(birthDay) {
  const today = new Date();
  const birthDate = new Date(birthDay);
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if( today < birthDate) throw new BadRequestException('Birth date must be a valid date.');
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  return age;
  }
  return age;
}