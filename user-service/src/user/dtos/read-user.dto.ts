import { Expose } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

export class ReadUserDto {

  @Expose()
  id: number;

  @Expose()
  login: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phone?: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(partial: Partial<ReadUserDto | UserEntity>) {
    Object.assign(this, partial);
  }
}
