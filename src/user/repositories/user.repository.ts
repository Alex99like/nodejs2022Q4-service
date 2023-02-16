import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dto/createUser.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getAll() {
    const users = await this.userRepository.find({select: ['id', 'login', 'version', 'createdAt', 'updatedAt']});

    return users.map((el) => ({ ...el, createdAt: +el.createdAt, updatedAt: +el.updatedAt }))
  }

  async userById(id: string) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async createAndUpdateUser(dto: CreateUserDto) {
    return await this.userRepository.save(dto)
  }

  async remove(id: string) {
    return this.userRepository.delete(id)
  }
}