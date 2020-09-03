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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
const user_entity_1 = require("./entity/user.entity");
let AppService = class AppService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async getUser(id) {
        const user = mongodb_1.ObjectID.isValid(id) && await this.usersRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async updateUser(id, user) {
        const exists = mongodb_1.ObjectID.isValid(id) && await this.usersRepository.findOne(id);
        if (!exists) {
            throw new common_1.NotFoundException();
        }
        if (!user || !user.username || !user.email || !user.phone) {
            throw new common_1.BadRequestException(`A user must have at least username, email, and phone defined`);
        }
        await this.usersRepository.update(id, user);
    }
    async deleteUser(id) {
        const exists = mongodb_1.ObjectID.isValid(id) && await this.usersRepository.findOne(id);
        if (!exists) {
            throw new common_1.NotFoundException();
        }
        await this.usersRepository.delete(id);
    }
    async addUser(user) {
        if (!user || !user.username || !user.email || !user.phone) {
            throw new common_1.BadRequestException(`A user must have at least username, email, and phone defined`);
        }
        return await this.usersRepository.save(new user_entity_1.User(user));
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map