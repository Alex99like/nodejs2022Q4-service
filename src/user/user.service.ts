import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { IUser } from './types/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ERROR_MSG_USER } from './messages/error.message';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async getAll(): Promise<IUser[]> {
    const users = await this.dbService.getAllUsers();

    return users.map((el) => {
      delete el.password;
      return el;
    });
  }

  async getById(id: string, viewPassword = false): Promise<IUser> {
    const user = await this.dbService.getByKeyUser({ key: 'id', prop: id });
    if (!user) throw new NotFoundException(ERROR_MSG_USER.NOT_FOUND);

    return !viewPassword ? this.handlerRequest(user) : user;
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const newUser: IUser = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.dbService.saveUser(newUser);
    return this.handlerRequest(newUser);
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

    await this.dbService.updateUser(id, user);

    return this.handlerRequest(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.getById(id);
    await this.dbService.deleteUser(user.id);
  }

  async handlerRequest(data: IUser): Promise<IUser> {
    const reqUser = { ...data };
    delete reqUser.password;
    return reqUser;
  }
}
