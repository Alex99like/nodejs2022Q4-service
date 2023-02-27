import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UserService } from 'src/user/user.service';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
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
    try {
      const body = (await this.jwtService.verifyAsync(dto.refreshToken)) as {
        id: string;
      };

      if (!body) throw new UnauthorizedException('Invalid token or expired');
      const user = await this.userService.getById(body.id);

      return await this.issueTokenPair(user.id);
    } catch (e) {
      throw new UnauthorizedException('Invalid token or expired');
    }
  }

  async issueTokenPair(userId: string) {
    const data = {
      id: userId,
    };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    return { accessToken, refreshToken };
  }
}
