import { Controller, Get, Post, Render, Res, Body, HttpStatus, Req, Param , Redirect} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { User } from './app.entity';
import { JwtService } from '@nestjs/jwt';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private jwtService: JwtService,) {}

@Get()
@Redirect('/signin')
getRoot(){}

@Get('/verify')
 getVerify(@Res() res: Response)
 {
  res.sendFile("/app/views/verify.html");
 }

 @Get('/index')
 getIndex(@Res() res: Response)
 {
  res.sendFile("/app/views/index.html");
 }

@Get('/signup')
 getSignup(@Res() res: Response) {
   res.sendFile("/app/views/signup.html");
 }

  @Get('/signin')
 getSignin(@Res() res: Response) {
   res.sendFile("/app/views/signin.html");
 }

 @Post('/signup')
 async signup(@Body() user: User, @Res() res: Response) {
   return  await this.appService.signup(user, res);
 }

 @Post('/signin')
 async signin(@Body() user: User) {
  return await this.appService.signin(user, this.jwtService);
 }

 @Post('/verify')
 async Verify(@Body() body: any, @Res() res: Response) {
  return await this.appService.verify(body.code, res);
 }

}
