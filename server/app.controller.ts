import { Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }



  @Get('getData')
  async getData() {
    console.log('server getData called');
    return this.appService.getData();
  }


  @Post('postData')
  async postData() {
    console.log('server postData called');
    return this.appService.postData();
  }

} 