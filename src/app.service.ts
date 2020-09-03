import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: MongoRepository<User>
	) {}
	
	async findAll(): Promise<User[]> {
		return await this.usersRepository.find();
	}
	
	async getUser(id): Promise<User> {
		const user = ObjectID.isValid(id) && await this.usersRepository.findOne(id);
		if (!user) {
			// Entity not found
			throw new NotFoundException();
		}
		return user;
	}
	
	async updateUser(id, user: Partial<User>): Promise<void> {
		// Check if entity exists
		const exists = ObjectID.isValid(id) && await this.usersRepository.findOne(id);
		if (!exists) {
			throw new NotFoundException();
		}
		if (!user || !user.username || !user.email || !user.phone) {
			throw new BadRequestException(`A user must have at least username, email, and phone defined`);
		}
		await this.usersRepository.update(id, user);
	}
	
	async deleteUser(id): Promise<void> {
		// Check if entity exists
		const exists = ObjectID.isValid(id) && await this.usersRepository.findOne(id);
		if (!exists) {
			throw new NotFoundException();
		}
		await this.usersRepository.delete(id);
	}
	
	async addUser(user: Partial<User>): Promise<User> {
		//console.log('params:', user);		
		if (!user || !user.username || !user.email || !user.phone) {
			throw new BadRequestException(`A user must have at least username, email, and phone defined`);
		}
		return await this.usersRepository.save(new User(user));
	}
}
