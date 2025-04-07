import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import {
  unzip,
  parseRootFile,
  parseContentOpf,
  copyCoverImage,
  copyUnzipBook,
} from './epub-parse';
const { execSync } = require('child_process');

const TEMP_PATH = '.vben/temp-book';
class EpubBook {
  private bookPath: string;
  private file: string;
  private fileName: string;
  private size: number;

  constructor(bookPath, file) {
    this.bookPath = bookPath;
    this.file = file;
    this.fileName = file.originalname;
    this.size = file.size;
  }
  async parse() {
    console.log('电子书解析', this.bookPath, this.file);
    // 1.生成临时文件
    const homeDir = os.homedir();
    const tmpDir = path.resolve(homeDir, TEMP_PATH);
    const tmpFile = path.resolve(tmpDir, this.fileName);
    fse.copySync(this.bookPath, tmpFile);
    // 2.epub电子书解析
    const tmpUnzipDirName = this.fileName.replace('.epub', '');
    const tmpUnzipDir = path.resolve(tmpDir, tmpUnzipDirName);
    fse.mkdirpSync(tmpUnzipDir);
    unzip(this.bookPath, tmpUnzipDir); // 1.需要手动将内部同名文件夹取出来 bug
    // console.log(tmpUnzipDirName, tmpUnzipDir);
    //  3.epub root file解析
    const rootFile = await parseRootFile(tmpUnzipDir);
    // console.log(rootFile);
    // 4.epub content opf解析// 拿到了OEBPS/content.opf
    const bookData = await parseContentOpf(tmpUnzipDir, rootFile, this.fileName);
    // 5.拷贝电子书封面图片
    let cover;
    cover = copyCoverImage(bookData, tmpDir);
    bookData.cover = cover;
    // 6。拷贝解压的电子书
    copyUnzipBook(tmpUnzipDir, tmpUnzipDirName);
    // 6.删除临时文件 todozj 1
    // fse.removeSync(tmpFile); //上传有bug，暂时不删除，手动移动目录，epub文件内部问题
    // fse.removeSync(tmpUnzipDir);
    return bookData;
  }
}
export default EpubBook;
