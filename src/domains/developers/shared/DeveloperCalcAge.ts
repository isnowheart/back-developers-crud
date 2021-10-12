import {  BadRequestException } from '@nestjs/common';

export default function calcAge(birthDay) {
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