import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports:[TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers:[BookService]
})
export class BookModule {
  
}
