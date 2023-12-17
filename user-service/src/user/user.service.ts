import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { GrpcMethod } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @GrpcMethod('UserService', 'Create')
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
        where: { deletedAt: IsNull() },
    });
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
        where: { deletedAt: IsNull(), id }
    });
  }

  @GrpcMethod('UserService', 'FindByUsername')
  async findOneByUsername(login: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
        where: { deletedAt: IsNull(), login }
    });
  }

  @GrpcMethod('UserService', 'Update')
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  @GrpcMethod('UserService', 'Remove')
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.update(id, { deletedAt: new Date() });
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
