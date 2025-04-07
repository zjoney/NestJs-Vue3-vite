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
import { wrapperResponse } from 'src/utils';
import { MenuService } from './menu.service';

// 自定义用户信息接口扩展
interface CustomUser {
  username: string;
}

interface CustomRequest extends Request {
  user: CustomUser;
}

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('active') // 放顶部
  getActiveMenu() {
    return wrapperResponse(this.menuService.findActive(), '获取菜单成功');
  }

  @Get(':id')
  getMenu(@Param('id', ParseIntPipe) id: number) {
    // return this.userService.findOne(id);
  }

  @Get()
  getAllMenu() {
    return wrapperResponse(this.menuService.findAll(), '获取菜单成功');
  }

  @Post()
  create(@Body() body) {
    return wrapperResponse(this.menuService.create(body), '菜单增加成功');
  }

  @Put()
  update(@Body() body) {
    return wrapperResponse(this.menuService.update(body), '菜单更新成功');
  }

  

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.userService.remove(id);
  }
}
