import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}
	
	findAll(): string {
		return 'All users';
	}
	
	getUser(id): string {
		return `Get user ${id}`;
	}
	
	updateUser(id): string {
		return `Update user ${id}`;
	}
	
	deleteUser(id): string {
		return `Delete user ${id}`;
	}
	
	addUser(params): string {
		console.log('params:', params);
		return `Add new user`;
	}
}
