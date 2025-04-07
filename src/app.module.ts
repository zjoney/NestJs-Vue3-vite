import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { MenuModule } from './modules/menu/menu.module';
import { getMysqlUsernameAndPassword } from './utils';

const { username, password } = getMysqlUsernameAndPassword();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3308,
      username,
      password,
      database: 'vben-book-dev',
      autoLoadEntities: true,
      // synchronize: true,
      logging:true
    }),
    UserModule,
    AuthModule,
    BookModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
