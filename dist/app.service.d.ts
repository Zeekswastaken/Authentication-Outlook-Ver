import { User } from "./app.entity";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Response } from 'express';
export declare class AppService {
    private userRepository;
    private mailerService;
    private code;
    constructor(userRepository: Repository<User>, mailerService: MailerService);
    sendConfirmedEmail(user: User): Promise<void>;
    sendConfirmationEmail(user: any): Promise<void>;
    signup(user: User, res: Response): Promise<any>;
    signin(user: User, jwt: JwtService): Promise<any>;
    verify(code: string, res: Response): Promise<any>;
}
