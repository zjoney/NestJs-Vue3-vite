import * as fs from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const dir = process.cwd();
// const httpsOptions = {
//   key: fs.readFileSync(path.resolve(dir, './https/youbaobao.xyz.key')),
//   cert: fs.readFileSync(path.resolve(dir, './https/youbaobao.xyz.pem')),
// };

async function bootstrap() {
  // 暂时本地没有证书
  // const httpApp = await NestFactory.create(AppModule, { cors: true });
  // const httpsApp = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  // await httpApp.listen(3000); // http service
  // await httpsApp.listen(4000); // https service

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
