import { HttpException, HttpStatus } from '@nestjs/common';

export class NoIdException extends HttpException {
  constructor() {
    super('No id in entity', HttpStatus.NOT_ACCEPTABLE);
  }
}
