import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { wrapperResponse } from 'src/utils';

// 自定义用户信息接口扩展
interface CustomUser {
  username: string;
}

interface CustomRequest extends Request {
  user: CustomUser;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  getUserByToken(@Req() request) {
    return wrapperResponse(
      this.userService.findByUsername(request.user.username),
      '获取用户信息成功',
    );
  
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  getAllUser(@Query() query) {
    // return wrapperResponse(
    //   this.userService.findAll(query),
    //   '获取用户列表成功',
    // );
    return this.userService.findAll(query);
  }

  @Put()
  update(@Body() body) {
    // return wrapperResponse(
    //   this.userService.update(body),
    //   '编辑用户成功',
    // );
    return this.userService.update(body);
  }

  @Post()
  create(@Body() body) {
    // return wrapperResponse(
    //   this.userService.create(body),
    //   '新增用户成功',
    // );
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
