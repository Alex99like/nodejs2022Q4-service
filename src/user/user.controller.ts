import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from './types/user.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ValidateUuidPipe } from '../pipes/ValidateUuidPipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser(): Promise<UserRequest[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ValidateUuidPipe) id: string,
  ): Promise<UserRequest> {
    return this.userService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<UserRequest> {
    return this.userService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserRequest> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ValidateUuidPipe) id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
