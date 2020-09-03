import { AppService } from './app.service';
import { UserDto } from './user.dto';
import { User } from './entity/user.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findAll(): Promise<User[]>;
    getUser(id: any): Promise<User>;
    updateUser(id: any, user: Partial<User>): Promise<void>;
    deleteUser(id: any): Promise<void>;
    addUser(user: UserDto): Promise<User>;
}
