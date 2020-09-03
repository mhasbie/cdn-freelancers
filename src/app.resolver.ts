import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { UserDto } from './user.dto';
import { UsersArgs } from './user.args.dto';
import { User } from './entity/user.entity';
import { AppService } from './app.service';

const pubSub = new PubSub();

@Resolver(of => User)
export class AppsResolver {
	constructor(private readonly appService: AppService) {}

	@Query(returns => User)
	async getUser(@Args('id') id: string): Promise<User> {
		const user = await this.appService.getUser(id);
		if (!user) {
			throw new NotFoundException(id);
		}
		return user;
	}

	@Query(returns => [User])
	async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
		return await this.appService.findAllUsers(usersArgs);
	}
	
	@Mutation(returns => Boolean)
	async removeUser(@Args('id') id: string) {
		
		const user = await this.appService.getUser(id);
		if (!user) {
			return false;
		} else {
			await this.appService.deleteUser(id);
			return true;
		}
	}

	@Mutation(returns => User)
	async addUser(
		@Args('newUser') newUser: UserDto
	): Promise<User> {
		const user = await this.appService.addUser(newUser);
		pubSub.publish('userAdded', { userAdded: user });
		return user;
	}
	
	@Mutation(returns => Boolean)
	async updateUser(
		@Args('id') id: string,
		@Args('userData') userData: UserDto
	) {
		const exist = await this.appService.getUser(id);
		if (!exist) {
			return false;
		} else {
			await this.appService.updateUser(id, userData);
			return true;
		}
	}
  
	@Subscription(returns => User)
	userAdded() {
		return pubSub.asyncIterator('userAdded');
	}
}