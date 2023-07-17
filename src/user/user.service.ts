import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAllUser() {
    return await this.userRepo.find();
  }

  async findUserByUsername(username: string) {
    return this.userRepo.findOne({
      where: {
        email: username,
      },
    });
  }

  async findUserById(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userRepo.merge(user, updateUserDto);
    return await this.userRepo.save(updatedUser);
  }

  async deleteUserById(id: number) {
    const { id: userId } = await this.findUserById(id);

    if (!userId) {
      throw new Error('User not found');
    }

    return await this.userRepo.delete(userId);
  }
}
