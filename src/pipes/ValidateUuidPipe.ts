import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'uuid';

export class ValidateUuidPipe implements PipeTransform {
  transform(value: string, meta: ArgumentMetadata): any {
    if (meta.type !== 'param') return value;

    if (!validate(value)) throw new BadRequestException('Invalid format id');

    return value;
  }
}
