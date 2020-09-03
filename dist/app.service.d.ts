import { MongoRepository } from 'typeorm';
import { User } from './entity/user.entity';
export declare class AppService {
    private readonly usersRepository;
    constructor(usersRepository: MongoRepository<User>);
    findAll(): Promise<User[]>;
    getUser(id: any): Promise<User>;
    updateUser(id: any, user: Partial<User>): Promise<void>;
    deleteUser(id: any): Promise<void>;
    addUser(user: Partial<User>): Promise<User>;
}
