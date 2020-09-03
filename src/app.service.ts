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
	
	addUser(): string {
		return `Add new user`;
	}
}

export class FindUserDto {
	@ApiProperty()
	id: string;
}

export class CreateUserDto {
	@ApiProperty()
	id: string;
	
	@ApiProperty()
	username: string;
	
	@ApiProperty()
	email: string;
	
	@ApiProperty()
	phone: string;
	
	@ApiProperty()
	skillsets: string;
	
	@ApiProperty()
	hobby: string;
}
