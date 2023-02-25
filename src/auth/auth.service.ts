import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/user.service';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  private readonly refreshToken = '15d';
  private readonly accessToken = '1h';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signup(dto: CreateUserDto) {
    const salt = await genSalt(10);

    const newUser = {
      login: dto.login,
      password: await hash(dto.password, salt),
    };

    const user = await this.userService.create(newUser);

    const tokens = await this.issueTokenPair(user.id);
    const resUser = { ...user, ...tokens };

    return resUser;
  }

  async login(dto: CreateUserDto) {
    const user = await this.userRepository.userById({
      key: 'login',
      value: dto.login,
    });

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('No valid password');

    const tokens = await this.issueTokenPair(user.id);
    const resUser = { ...user, ...tokens };

    return resUser;
  }

  async newToken(dto: RefreshDto) {
    const body = (await this.jwtService.verifyAsync(dto.refreshToken)) as {
      id: string;
    };
    const user = await this.userService.getById(body.id);

    return await this.issueTokenPair(user.id);
  }

  async issueTokenPair(userId: string) {
    const data = {
      id: userId,
    };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: this.refreshToken,
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: this.accessToken,
    });

    return { accessToken, refreshToken };
  }
}
