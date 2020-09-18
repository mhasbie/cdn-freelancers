import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class RestApiService implements ApiService {
	
	private baseUrl = 'https://cdn-freelancers.herokuapp.com/';

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
}
