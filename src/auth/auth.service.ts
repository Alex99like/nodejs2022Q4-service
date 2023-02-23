import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  async signup(dto: CreateUserDto) {
    console.log(dto);
  }

  async login(dto: CreateUserDto) {
    console.log(dto);
  }

  async refreshToken() {
    console.log();
  }
}
