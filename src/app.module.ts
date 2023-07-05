import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app.entity';
import { ConfigModule} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


import { join } from 'path';
@Module({
  imports: [   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'zeeks',
    password: 'zeee',
    database: 'mynestdb',
    entities: [User],
    logging: true,
    synchronize: true,
  }),
TypeOrmModule.forFeature([User]),
ConfigModule.forRoot(),
JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: {expiresIn: '3m'},
}),
MailerModule.forRoot({
  transport: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: 'EMAIL HERE' ,
      pass: 'PASSWORD HERE' ,
    },
  },
}
)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
