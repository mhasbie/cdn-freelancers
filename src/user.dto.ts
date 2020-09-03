import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDto {
	@Field()
	@ApiProperty()
	username: string;
	
	@Field()
	@ApiProperty()
	email: string;
	
	@Field()
	@ApiProperty()
	phone: string;
	
	@Field(type => [String])
	@ApiProperty()
	skillsets: string[];
	
	@Field(type => [String])
	@ApiProperty()
	hobby: string[];
}