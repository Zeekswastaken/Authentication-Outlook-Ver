import { AppService } from './app.service';
import { Response } from 'express';
import { User } from './app.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    getRoot(): void;
    getVerify(res: Response): void;
    getIndex(res: Response): void;
    getSignup(res: Response): void;
    getSignin(res: Response): void;
    signup(user: User, res: Response): Promise<any>;
    signin(user: User): Promise<any>;
    Verify(body: any, res: Response): Promise<any>;
}
