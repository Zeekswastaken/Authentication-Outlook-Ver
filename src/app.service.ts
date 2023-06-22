import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "./app.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Response } from 'express';


@Injectable()
export class AppService {
  private code;
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private mailerService: MailerService) {
    this.code = Math.floor(10000 + Math.random() * 90000);
  }

  async sendConfirmedEmail(user: User) {
    const {fullname, email} = user;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to my site you stinky loser! Email Confirmed',
      // template: 'confirmed',THIS IS FOR A TEMPLATE FILE LIKE EJS
      //THIS IS FOR HTML ONLY
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Confirmation Page</title>
      </head>
      <body>
        <h1>Email Confirmed</h1>
        <p>Thank you for confirming your email address.</p>
        <p>Welcome to our site!</p>
      </body>
      </html>
          `,
      context: {
        fullname: user.fullname,
        email: user.email,
      },
    });
  }

  async sendConfirmationEmail(user: any){
    await user;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to my site you stinky loser! Confirm Email',
      // template: __dirname + '/../views/verify.html', THIS IS FOR A TEMPLATE FILE LIKE EJS
      //THIS IS FOR HTML ONLY
      // template: 'confirm',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Verify Page</title>
      </head>
      <body>
      <h1>Verify Email</h1>
      <p>Hello ${user.fullname},</p>
      <p>Please use the following verification code to confirm your email:</p>
      <p>Verification Code: ${this.code}</p>
    </body>
      </html>
    `,
      context: {
        fullname: user.fullname,
        email: user.email,
      },
    });
  }

  async signup(user: User, res: Response): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, salt);
      const reqBody = {
        fullname: user.fullname,
        email: user.email,
        password: hash,
        authConfirmToken: this.code,   
      }
      const newUs = this.userRepository.insert(reqBody);
      await this.sendConfirmationEmail(reqBody)
      res.redirect('/app/views/verify.html');
      return true;
    }
    catch(e){
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signin(user: User, jwt: JwtService): Promise<any> {
    try{
      const rUser = await this.userRepository.findOne({where : { email: user.email }});
      if (rUser)
      {
        if (rUser.isVerified){
        if (bcrypt.compare(user.password, rUser.password))
        {
          const payload = {email: user.email};
          return {
            token: jwt.sign(payload),
          };
        }
      }
      else {
        return new HttpException('Please verify your account', HttpStatus.UNAUTHORIZED)
    }
    return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
  }
  return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
}catch(e){
return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

async verify(code: string, res: Response): Promise<any> {
  try{
    const user = await this.userRepository.findOne({
      where: { authConfirmToken: code }

    });
    if (!user)
      return new HttpException('Verification code has expired or not found', HttpStatus.UNAUTHORIZED)
      await this.userRepository.update( { authConfirmToken: user.authConfirmToken }, { isVerified: true, authConfirmToken: undefined })
      await this.sendConfirmationEmail(user);
      res.sendFile('/app/views/index.html'); 
    }
    catch (e)
    {
      return new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
