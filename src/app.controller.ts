// param
// Query
// Body
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Param,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/data/:subId') // 测试基本错误定制
  @Get('/data/:id')
  @UseFilters(new HttpExceptionFilter())
  getData2(@Param() params): string {
    return this.appService.getData2(params);
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }

  @Post('/data')
  getData(@Body() body, @Query() query) {
    console.log(body, query);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return 'add Data:' + JSON.stringify(body) + ',id=' + query.id;
  }

  @Put('/data')
  updateData(@Body() body, @Query() query) {
    console.log(body, query);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return 'update  Data:' + JSON.stringify(body) + ',id=' + query.id;
  }

  @Delete('/data/:id')
  deleteData(@Param() param) {
    console.log(param);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return 'delete  Data:' + ',id=' + param.id;
  }
}
