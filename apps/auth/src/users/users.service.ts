import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as brcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  // async create(createUserDto: CreateUserDto) {
  //   await this.validateCreateUserDto(createUserDto);
  //   return this.usersRepository.create({
  //     ...createUserDto,
  //     password: await brcrypt.hash(createUserDto.password, 10),
  //   });
  // }

  async create(createUserDto: CreateUserDto) {
    const uid = createUserDto.uid;
    const user = await this.usersRepository.findOne({
      where: {
        uid,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return await this.usersRepository.create(createUserDto);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user && (await brcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Credentials are not valid');
  }

  async getUserById(id: string){
    return this.usersRepository.findOne({_id: id});
}

async getUserByUid(uid: string){
    return this.usersRepository.findOne({uid: uid});
}
}
