"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const app_entity_1 = require("./app.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let AppService = exports.AppService = class AppService {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.code = Math.floor(10000 + Math.random() * 90000);
    }
    async sendConfirmedEmail(user) {
        const { fullname, email } = user;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to my site you stinky loser! Email Confirmed',
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
    async sendConfirmationEmail(user) {
        await user;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to my site you stinky loser! Confirm Email',
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
      <form method="POST" action="/verify">
        <input type="text" name="code" placeholder="Verification Code" required>
        <button type="submit">Verify</button>
      </form>
    </body>
      </html>
    `,
            context: {
                fullname: user.fullname,
                email: user.email,
            },
        });
    }
    async signup(user, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(user.password, salt);
            const reqBody = {
                fullname: user.fullname,
                email: user.email,
                password: hash,
                authConfirmToken: this.code,
            };
            const newUs = this.userRepository.insert(reqBody);
            await this.sendConfirmationEmail(reqBody);
            res.redirect('/app/views/verify.html');
            return true;
        }
        catch (e) {
            return new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signin(user, jwt) {
        try {
            const rUser = await this.userRepository.findOne({ where: { email: user.email } });
            if (rUser) {
                if (rUser.isVerified) {
                    if (bcrypt.compare(user.password, rUser.password)) {
                        const payload = { email: user.email };
                        return {
                            token: jwt.sign(payload),
                        };
                    }
                }
                else {
                    return new common_1.HttpException('Please verify your account', common_1.HttpStatus.UNAUTHORIZED);
                }
                return new common_1.HttpException('Incorrect username or password', common_1.HttpStatus.UNAUTHORIZED);
            }
            return new common_1.HttpException('Incorrect username or password', common_1.HttpStatus.UNAUTHORIZED);
        }
        catch (e) {
            return new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verify(code, res) {
        try {
            const user = await this.userRepository.findOne({
                where: { authConfirmToken: code }
            });
            if (!user)
                return new common_1.HttpException('Verification code has expired or not found', common_1.HttpStatus.UNAUTHORIZED);
            await this.userRepository.update({ authConfirmToken: user.authConfirmToken }, { isVerified: true, authConfirmToken: undefined });
            await this.sendConfirmationEmail(user);
            res.sendFile('/app/views/index.html');
        }
        catch (e) {
            return new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(app_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, mailer_1.MailerService])
], AppService);
//# sourceMappingURL=app.service.js.map