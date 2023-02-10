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
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<IUser[]> {
    const users = await this.userRepository.find({select: ['id', 'login', 'version', 'createdAt', 'updatedAt']});

    return users.map((el) => ({ ...el, createdAt: +el.createdAt, updatedAt: +el.updatedAt }))
  }

  async getById(id: string, viewPassword = false): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { id } })
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

    const user = await this.userRepository.save(newUser)

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

    const updateUser = await this.userRepository.save(user)
    return this.handlerRequest(updateUser)
  }

  async delete(id: string): Promise<void> {
    const user = await this.getById(id);
    await this.userRepository.delete(user.id);
  }

  async handlerRequest(data: IUser): Promise<IUser> {
    const reqUser: IUser = { ...data, updatedAt: +data.updatedAt, createdAt: +data.createdAt };
    delete reqUser.password;
    return reqUser;
  }
}
