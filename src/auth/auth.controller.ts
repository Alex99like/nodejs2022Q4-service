import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return await this.authService.newToken(dto);
  }
}
