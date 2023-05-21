import { HttpException, HttpStatus } from '@nestjs/common';

export class NotExist extends HttpException {
  constructor() {
    super('Item is not exist', HttpStatus.NOT_FOUND);
  }
}
