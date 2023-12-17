import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class LoginDto {
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
