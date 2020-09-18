import { Injectable } from '@angular/core';

export interface User {
	username: string;
	email: string;
	phone: string;
	skillsets: string;
	hobby: string;
}

@Injectable()
export abstract class ApiService {
	abstract getAllUsers();
	
	abstract updateUser(id: string, user: any);
	
	abstract deleteUser(id: string);
	
	abstract createUser(user: any);
}