import { BadRequestException } from '@nestjs/common';

export default {
  calcAge(birthDay) {
    const today = new Date();
    const birthDate = new Date(birthDay);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if( today < birthDate) throw new BadRequestException('Birth date must be a valid date as YYYY-MM-DD.');
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return age;
    }
    return age;
  },

  store(newDeveloper){
    newDeveloper.age = this.calcAge(newDeveloper.birthdate);
    newDeveloper.gender = newDeveloper.gender.toUpperCase()

    if(newDeveloper.name.length == 0 ) throw new BadRequestException('Name is empty.');
    if(typeof newDeveloper.name !== 'string') throw new BadRequestException('Name must be a string.');
    if(newDeveloper.gender.length > 1) throw new BadRequestException('Gender must have just 1 character.');
    if(!(newDeveloper.gender === 'M' || newDeveloper.gender === 'F')) throw new BadRequestException('Gender must be F or M.');
    if(newDeveloper.hobby.length == 0 ) throw new BadRequestException('Hobby is empty.');
    if(newDeveloper.birthdate.length == 0 ) throw new BadRequestException('Birth Date is empty.');
  },

  edit(updateDeveloper) {
    updateDeveloper.age = this.calcAge(updateDeveloper.birthdate);
    updateDeveloper.gender = updateDeveloper.gender.toUpperCase()

    if(typeof updateDeveloper.name !== 'string') throw new BadRequestException('Name must be a string.');
    if(updateDeveloper.gender.length > 1) throw new BadRequestException('Gender must have just 1 character.');
    if(!(updateDeveloper.gender === 'M' || updateDeveloper.gender === 'F')) throw new BadRequestException('Gender must be F or M.');
  }
}
