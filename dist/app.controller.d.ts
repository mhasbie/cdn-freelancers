import { AppService } from './app.service';
import { FindUserDto, CreateUserDto } from './user.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    findAll(): string;
    getUser(params: FindUserDto): string;
    updateUser(params: FindUserDto): string;
    deleteUser(params: FindUserDto): string;
    addUser(params: CreateUserDto): string;
}
