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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_entity_1 = require("./app.entity");
const jwt_1 = require("@nestjs/jwt");
let AppController = exports.AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    getRoot() { }
    getVerify(res) {
        res.sendFile("/app/views/verify.html");
    }
    getIndex(res) {
        res.sendFile("/app/views/index.html");
    }
    getSignup(res) {
        res.sendFile("/app/views/signup.html");
    }
    getSignin(res) {
        res.sendFile("/app/views/signin.html");
    }
    async signup(user, res) {
        return await this.appService.signup(user, res);
    }
    async signin(user) {
        return await this.appService.signin(user, this.jwtService);
    }
    async Verify(body, res) {
        return await this.appService.verify(body.code, res);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Redirect)('/signin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoot", null);
__decorate([
    (0, common_1.Get)('/verify'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getVerify", null);
__decorate([
    (0, common_1.Get)('/index'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('/signup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSignup", null);
__decorate([
    (0, common_1.Get)('/signin'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSignin", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_entity_1.User]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "Verify", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map