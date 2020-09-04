import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { UserDto } from './user.dto';

describe('AppService', () => {
	let appService: AppService;
	let module: TestingModule;
	let userRepositoryMock: MockType<Repository<User>>;
	const mockNumberToSatisfyParameters = 0;

	beforeEach(async () => {
		module = await Test.createTestingModule({
			providers: [
				AppService,
				// { provide: getRepositoryToken(User), useFactory: repositoryMockFactory },
				{ provide: getRepositoryToken(User), useClass: Repository },
			],
		}).compile();

		appService = module.get<AppService>(AppService);
		userRepositoryMock = module.get(getRepositoryToken(User));
	});
	
	it('should be defined', () => {
		expect(appService).toBeDefined();
	});
	
	describe('* Find User By Id', () => {
		it('should return an entity of user if successful', async () => {
			
			const userId = '5f511f01f70c9a1ec8a93abc';
			const user: User = {
				id: userId,
				username: 'mh',
				email: 'mh@mail.com',
				phone: '0123456789',
				skillsets: ['s1', 's2', 's3'],
				hobby: ['h1', 'h2']
			};
			jest.spyOn(userRepositoryMock, 'findOne').mockReturnValue(user);
			expect(await appService.getUser(userId)).toEqual(user);
		});
		
		it('should throw NotFoundException if user not found', async (done) => {
			const expectedResult = undefined;
			const mockNumberToSatisfyParameters = 0;
			jest.spyOn(userRepositoryMock, 'findOne').mockImplementation(() => {
				throw new NotFoundException();
			});
			await appService.getUser(mockNumberToSatisfyParameters)
				.then(() => {
					done.fail('App service should return NotFoundException error of 404 but did not');
				})
				.catch((error) => {
					expect(error.status).toBe(404);
					expect(error.message).toBe('Not Found');
					done();
				});
		});
		
	});
	
	describe('* Create User ', () => {
		const dto = new UserDto();
		
		it('should return an object of user entity when created', async () => {
			const expectedResult: User = {
				id: '5f511f01f70c9a1ec8a93abc',
				username: 'mh',
				email: 'mh@mail.com',
				phone: '0123456789',
				skillsets: ['s1', 's2', 's3'],
				hobby: ['h1', 'h2']
			};
			jest.spyOn(userRepositoryMock, 'save').mockReturnValue(expectedResult);
			expect(await appService.addUser(expectedResult)).toBe(expectedResult);
		});

		it('should return BadRequestException if invalid user input', async (done) => {
			await appService.addUser(dto)
				.then(() => done.fail('App controller should return BadRequestException error of 400 but did not'))
				.catch((error) => {
					expect(error.status).toBe(400);
					expect(error.message).toBe('A user must have at least username, email, and phone defined');
					done();
				});
		});
	});
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
	findOne: jest.fn(),
	find: jest.fn(),
	update: jest.fn(),
	save: jest.fn()
}));

export type MockType<T> = {
	[P in keyof T]: jest.Mock<{}>;
};
