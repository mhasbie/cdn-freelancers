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
}