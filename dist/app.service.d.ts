import { MongoRepository } from 'typeorm';
import { User } from './entity/user.entity';
import { UsersArgs } from './user.args.dto';
export declare class AppService {
    private readonly usersRepository;
    constructor(usersRepository: MongoRepository<User>);
    findAll(): Promise<User[]>;
    findAllUsers(usersArgs: UsersArgs): Promise<User[]>;
    getUser(id: any): Promise<User>;
    updateUser(id: any, user: Partial<User>): Promise<void>;
    deleteUser(id: any): Promise<void>;
    addUser(user: Partial<User>): Promise<User>;
}
