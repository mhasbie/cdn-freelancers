import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FindUserDto, CreateUserDto } from './user.dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
  
	@Get('all')
	findAll(): string {
		return this.appService.findAll();
	}
  
	@Get(':id')
	getUser(@Param() params: FindUserDto): string {
		return this.appService.getUser(params.id);
	}
	
	@Post(':id')
	updateUser(@Param() params: FindUserDto): string {
		return this.appService.updateUser(params.id);
	}
	
	@Delete(':id')
	deleteUser(@Param() params: FindUserDto): string {
		return this.appService.deleteUser(params.id);
	}
	
	@Put()
	addUser(@Body() params: CreateUserDto): string {
		return this.appService.addUser(params);
	}
}
