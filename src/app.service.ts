import {
  // HttpException,
  // BadRequestException,
  HttpException,
  HttpStatus,
  // HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 777';
  }

  getTest(): string {
    return 'hellow test';
  }
  // getData2(params: any): string {
  //   if (!params.id) {
  //     // throw new HttpException(HttpStatus.BAD_REQUEST);
  //     throw new HttpException(
  //       { response: 'ID parameter is required' },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return 'get data' + params.id;
  // }

  getData2(params: { id: number }): string {
    if (!params?.id) {
      // throw new BadRequestException('ID 参数是必须的');
      throw new HttpException(
        { response: 'ID 参数是必须的' }, // 响应体必须用对象包裹
        HttpStatus.BAD_REQUEST,
      );
    }

    // 增强版数字校验（处理所有非数字情况）
    if (isNaN(params.id) || !isFinite(params.id)) {
      // throw new BadRequestException('ID 必须是一个数字');
      throw new HttpException(
        { response: 'ID 必须是一个数字' }, // 响应体必须用对象包裹
        HttpStatus.BAD_REQUEST,
      );
    }

    // 可选：范围校验（示例）
    if (params.id <= 0) {
      // throw new BadRequestException('ID 必须是一个合法数字');
      throw new HttpException(
        { response: 'ID 必须是一个合法数字' }, // 响应体必须用对象包裹
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'get data ' + params.id;
  }
}
