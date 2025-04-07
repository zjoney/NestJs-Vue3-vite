import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { wrapperCountResponse, wrapperResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  getBookList(@Query() params) {
    // return wrapperResponse(this.bookService.getBookList(params), '获取图书列表成功')
    return wrapperCountResponse(
      this.bookService.getBookList(params),
      this.bookService.countBookList(params),
      '获取图书列表成功',
    );
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id) {
    return 'getBook:' + id;
  }

  @Post()
  insertBook(@Body() body) {
    console.log(body);
    return wrapperResponse(this.bookService.addBook(body), '新增图书成功')
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /epub/,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return wrapperResponse(this.bookService.uploadBook(file), '上传文件成功');
  }
}
