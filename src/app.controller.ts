import { Controller, Get, Param } from '@nestjs/common';
import { AppService, FindUserDto, CreateUserDto } from './app.service';

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
}
