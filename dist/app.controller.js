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
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const user_dto_1 = require("./user.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async findAll() {
        return await this.appService.findAll();
    }
    async getUser(id) {
        return await this.appService.getUser(id);
    }
    async updateUser(id, user) {
        return await this.appService.updateUser(id, user);
    }
    async deleteUser(id) {
        return await this.appService.deleteUser(id);
    }
    async addUser(user) {
        return await this.appService.addUser(user);
    }
};
__decorate([
    common_1.Get('all'),
    swagger_1.ApiOperation({ description: 'Get all users' }),
    swagger_1.ApiResponse({ status: 200, description: 'OK' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation({ description: 'Fetch user' }),
    swagger_1.ApiParam({ name: 'id', type: 'string', required: true }),
    swagger_1.ApiResponse({ status: 200, description: 'OK' }),
    swagger_1.ApiResponse({ status: 404, description: 'Record not found.' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUser", null);
__decorate([
    common_1.Put(':id'),
    common_1.HttpCode(204),
    swagger_1.ApiOperation({ description: 'Update user' }),
    swagger_1.ApiParam({ name: 'id', type: 'string', required: true }),
    swagger_1.ApiBody({ type: user_dto_1.CreateUserDto, required: true }),
    swagger_1.ApiResponse({ status: 204, description: 'Record updated.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Record not found.' }),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateUser", null);
__decorate([
    common_1.Delete(':id'),
    common_1.HttpCode(204),
    swagger_1.ApiOperation({ description: 'Delete user' }),
    swagger_1.ApiParam({ name: 'id', type: 'string', required: true }),
    swagger_1.ApiResponse({ status: 204, description: 'Record deleted.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Record not found.' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteUser", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ description: 'Create new user' }),
    swagger_1.ApiBody({ type: user_dto_1.CreateUserDto, required: true }),
    swagger_1.ApiResponse({ status: 201, description: 'The record has been successfully created.' }),
    swagger_1.ApiResponse({ status: 400, description: 'Bad Request.' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addUser", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map