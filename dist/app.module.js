"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const app_entity_1 = require("./app.entity");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'postgres',
                port: 5432,
                username: 'zeeks',
                password: 'pass',
                database: 'mynestdb',
                entities: [app_entity_1.User],
                logging: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([app_entity_1.User]),
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '3m' },
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.office365.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ouazahrouz@outlook.com',
                        pass: 'zakaria:2000',
                    },
                },
                defaults: {
                    from: '"No Reply ouazahrouz@outlook.com"',
                },
                template: {
                    dir: (0, path_1.join)(__dirname, "../views/"),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                }
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map