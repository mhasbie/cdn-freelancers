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
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_resolver_1 = require("./app.resolver");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entity/user.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                debug: true,
                playground: true,
                autoSchemaFile: path_1.join(process.cwd(), 'src/schema.gql')
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: process.env.MONGODB_CONNECTION_STRING,
                database: process.env.MONGODB_DATABASE,
                entities: [
                    __dirname + '/**/*.entity{.ts,.js}',
                ],
                ssl: true,
                useUnifiedTopology: true,
                useNewUrlParser: true
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_resolver_1.AppsResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map