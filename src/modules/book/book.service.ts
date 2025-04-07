import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import EpubBook from './epub-book';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  getBookList(params: any = {}) {
    let page = +params.page || 1;
    let pageSize = +params.pageSize || 20;
    const { title = '', author = '' } = params;
    if (page < 0) {
      page = 1;
    }
    if (pageSize < 0) {
      pageSize = 20;
    }
    let where = 'where 1=1';
    if (title) {
      where += ` AND title LIKE '%${title}%'`;
    }

    if (author) {
      where += ` AND author LIKE '%${author}%'`;
    }

    const sql = `select * from book ${where} limit ${pageSize} offset ${(page - 1) * pageSize}`;
    return this.bookRepository.query(sql);
  }

  async countBookList(params: any = {}) {
    const { title = '', author = '' } = params;
    let where = 'where 1=1';
    // if (title) {
    //   where += ` AND title LIKE '%${title}%'`;
    // }
    // if (author) {
    //   where += ` AND author LIKE '%${author}%'`;
    // }
    const queryParams: any = []; // 参数化查询的参数数组（防SQL注入）

    // 动态添加书名条件（模糊查询）
    if (title) {
      where += ' AND title LIKE ?';
      queryParams.push(`%${title}%`);
    }

    // 动态添加作者条件（模糊查询）
    if (author) {
      where += ' AND author LIKE ?';
      queryParams.push(`%${author}%`);
    }
    // 1. 先查询总数（COUNT查询更快且不返回实际数据）
    const countSql = `SELECT COUNT(*) AS count FROM book ${where}`;
    const totalResult = await this.bookRepository.query(countSql, queryParams);

    return totalResult;
    // const sql = `SELECT COUNT(*) AS total from book ${where}`;
    // console.log(sql, 'sql  sql')
    // return this.bookRepository.query(sql);
  }

  uploadBook(file) {
    const desDir =
      process.env.UPLOAD_DIR || '/Users/qingmou/docker/nginx/html/upload';
    const desPath = path.resolve(desDir, file.originalname);
    fs.writeFileSync(desPath, file.buffer);

    // 电子解析
    return this.parseBook(desPath, file).then((data) => {
      return {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: desPath,
        dir: desDir,
        data,
      };
    });
  }

  parseBook(desPath, file) {
    const epub = new EpubBook(desPath, file);
    return epub.parse();
  }
  
  async addBook(params) {
    const {
      title,
      author,
      fileName,
      category,
      categoryText,
      cover,
      language,
      publisher,
      rootFile,
    } = params;
    const insertSql = `INSERT INTO book(
    fileName,
    cover,
    title,
    author,
    publisher,
    bookId,
    category,
    categoryText,
    language,
    rootFile
    ) VALUES(
     '${fileName}',
     '${cover}',
     '${title}',
     '${author}',
     '${publisher}',
     '${fileName}',
     '${category}',
     '${categoryText}',
     '${language}',
     '${rootFile}'
     )`;

    return this.bookRepository.query(insertSql);
  }
}
