import { HttpException, HttpStatus } from '@nestjs/common';

export class DeadlineExpireException extends HttpException {
  constructor() {
    super('Deadline is expired', HttpStatus.NOT_ACCEPTABLE);
  }
}
