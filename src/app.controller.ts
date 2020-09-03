import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { AppService } from './app.service';
import { FindUserDto, CreateUserDto } from './user.dto';
import { User } from './entity/user.entity';

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService
	) {}
  
	@Get('all')
	@ApiOperation({ description: 'Get all users' })
	async findAll(): Promise<User[]> {
		return await this.appService.findAll();
	}
  
	@Get(':id')
	@ApiOperation({ description: 'Fetch user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	async getUser(@Param() params: FindUserDto): Promise<User> {
		return await this.appService.getUser(params.id);
	}
	
	@Put(':id')
	@ApiOperation({ description: 'Update user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	updateUser(@Param() params: FindUserDto): string {
		return this.appService.updateUser(params.id);
	}
	
	@Delete(':id')
	@ApiOperation({ description: 'Delete user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	deleteUser(@Param() params: FindUserDto): string {
		return this.appService.deleteUser(params.id);
	}
	
	@Post()
	@ApiOperation({ description: 'Create new user' })
	@ApiBody({ type: CreateUserDto, required: true })
	async addUser(@Body() params: CreateUserDto): Promise<User> {
		return await this.appService.addUser(params);
	}
}
