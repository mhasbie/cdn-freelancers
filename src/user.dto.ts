import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
	@ApiProperty()
	id: number;
}

export class CreateUserDto {
	@ApiProperty()
	username: string;
	
	@ApiProperty()
	email: string;
	
	@ApiProperty()
	phone: string;
	
	@ApiProperty()
	skillsets: string[];
	
	@ApiProperty()
	hobby: string[];
}
