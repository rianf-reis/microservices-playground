import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<boolean> {
    const createUserDto = new CreateUserDto();
    createUserDto.name = registerDto.name;
    createUserDto.login = registerDto.username;
    createUserDto.email = registerDto.email;
    createUserDto.password = registerDto.password;

    const user = await this.userService.create(createUserDto);
    if (user) return true;
    else throw new Error('User registration failed');
  }

  async validateUser(username: string, pass: string): Promise<LoginDto> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // Exclude the password when returning the user object
        const { password, ...result } = user;
        return new LoginDto(result);
      }
    }
    return null;
  }

  async login(user: LoginDto) {
    const payload = { username: user.login, sub: user.id };
    return {
      token: this.jwtService.sign(payload), // Generate JWT token
    };
  }
}
