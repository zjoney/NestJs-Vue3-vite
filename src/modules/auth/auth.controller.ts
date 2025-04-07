import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { error, success, wrapperResponse } from '../../utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() params) {
    // const data = this.authService.login(params.username, params.password);
    return wrapperResponse(
      this.authService.login(params.username, params.password),
      '登录成功',
    );
    
  }
}
