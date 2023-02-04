import { IsEmail, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
