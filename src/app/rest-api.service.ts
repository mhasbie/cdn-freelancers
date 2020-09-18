import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, ApiService } from './api.service';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RestApiService implements ApiService {
	
	private baseUrl = environment.restApiUrl;

	constructor(private httpClient: HttpClient) { }
  
	getAllUsers() {
		let url = this.baseUrl + 'user/all';
		return this.httpClient.get(url, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Content-Type': 'application/json',
			}
		});
	}
	
	updateUser(id, user) {
		let url = this.baseUrl + `user/${id}`;
		return this.httpClient.put(url, user);
	}
	
	deleteUser(id) {
		let url = this.baseUrl + `user/${id}`;
		return this.httpClient.delete(url);
	}
	
	createUser(user) {
		let url = this.baseUrl + `user/`;
		return this.httpClient.post(url, user);
	}
}
