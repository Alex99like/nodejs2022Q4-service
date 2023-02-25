import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUser } from './types/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ERROR_MSG_USER } from './messages/error.message';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string, viewPassword = false): Promise<IUser> {
    const user = await this.userRepository.userById({ key: 'id', value: id });
    if (!user) throw new NotFoundException(ERROR_MSG_USER.NOT_FOUND);

    return !viewPassword ? this.handlerRequest(user) : user;
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const newUser = {
      login: dto.login,
      password: dto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const user = await this.userRepository.createAndUpdateUser(newUser);

    return this.handlerRequest(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<IUser> {
    const user = await this.getById(id, true);
    if (dto.oldPassword == user.password) {
      user.password = dto.newPassword;
    } else {
      throw new ForbiddenException(ERROR_MSG_USER.NO_VALID_PASSWORD);
    }

    user.version = user.version + 1;
    user.updatedAt = Date.now();

    const updateUser = await this.userRepository.createAndUpdateUser(user);
    return this.handlerRequest(updateUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.getById(id);
    await this.userRepository.remove(user.id);
  }

  async handlerRequest(data: IUser): Promise<IUser> {
    const reqUser: IUser = {
      ...data,
      updatedAt: +data.updatedAt,
      createdAt: +data.createdAt,
    };
    delete reqUser.password;
    return reqUser;
  }
}
