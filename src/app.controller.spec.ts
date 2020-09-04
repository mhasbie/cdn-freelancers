import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { UserDto } from './user.dto';

jest.mock('./app.service');

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();

		appService = app.get<AppService>(AppService);
		appController = app.get<AppController>(AppController);
	});
	
	afterEach(() => {
		jest.resetAllMocks();
	});
	
	describe('* Find User By Id', () => {
		it('should return an entity of user if successful', async () => {
			const expectedResult = new User();
			const mockNumberToSatisfyParameters = 0;
			jest.spyOn(appService, 'getUser').mockResolvedValue(expectedResult);
			expect(await appController.getUser(mockNumberToSatisfyParameters)).toBe(expectedResult);
		});
		
		it('should throw NotFoundException if user not found', async (done) => {
			const expectedResult = undefined;
			const mockNumberToSatisfyParameters = 0;
			jest.spyOn(appService, 'getUser').mockImplementation(() => {
				throw new NotFoundException();
			});
			await appController.getUser(mockNumberToSatisfyParameters)
				.then(() => {
					done.fail('App controller should return NotFoundException error of 404 but did not');
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
			const expectedResult = new User();
			jest.spyOn(appService, 'addUser').mockResolvedValue(expectedResult);
			expect(await appController.addUser(dto)).toBe(expectedResult);
		});

		it('should return BadRequestException if invalid user input', async (done) => {
			jest.spyOn(appService, 'addUser').mockImplementation(() => {
				throw new BadRequestException(`A user must have at least username, email, and phone defined`);
			});
			await appController.addUser(dto)
				.then(() => done.fail('App controller should return BadRequestException error of 400 but did not'))
				.catch((error) => {
					expect(error.status).toBe(400);
					expect(error.message).toBe('A user must have at least username, email, and phone defined');
					done();
				});
		});
	});
});
