import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return {
      msg: `Nestjs Service getData: ${new Date().toISOString()}`
    };
  }

  postData() {
    return {
      msg: `Nestjs Service postData: ${new Date().toISOString()}`
    };
  }
} 