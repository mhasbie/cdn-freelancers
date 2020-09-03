import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { AppService } from './app.service';
import { UserDto } from './user.dto';
import { User } from './entity/user.entity';

@Controller('user')
export class AppController {
	constructor(
		private readonly appService: AppService
	) {}
  
	@Get('all')
	@ApiOperation({ description: 'Get all users' })
	@ApiResponse({ status: 200, description: 'OK'})
	async findAll(): Promise<User[]> {
		return await this.appService.findAll();
	}
  
	@Get(':id')
	@ApiOperation({ description: 'Fetch user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	@ApiResponse({ status: 200, description: 'OK'})
	@ApiResponse({ status: 404, description: 'Record not found.'})
	async getUser(@Param('id') id): Promise<User> {
		return await this.appService.getUser(id);
	}
	
	@Put(':id')
	@HttpCode(204)
	@ApiOperation({ description: 'Update user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	@ApiBody({ type: UserDto, required: true })
	@ApiResponse({ status: 204, description: 'Record updated.'})
	@ApiResponse({ status: 404, description: 'Record not found.'})
	async updateUser(@Param('id') id, @Body() user: Partial<User>): Promise<void> {
		await this.appService.updateUser(id, user);
	}
	
	@Delete(':id')
	@HttpCode(204)
	@ApiOperation({ description: 'Delete user' })
	@ApiParam({ name: 'id', type: 'string', required: true })
	@ApiResponse({ status: 204, description: 'Record deleted.'})
	@ApiResponse({ status: 404, description: 'Record not found.'})
	async deleteUser(@Param('id') id): Promise<void> {
		await this.appService.deleteUser(id);
	}
	
	@Post()
	@ApiOperation({ description: 'Create new user' })
	@ApiBody({ type: UserDto, required: true })
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
	@ApiResponse({ status: 400, description: 'Bad Request.'})
	async addUser(@Body() user: UserDto): Promise<User> {
		return await this.appService.addUser(user);
	}
}