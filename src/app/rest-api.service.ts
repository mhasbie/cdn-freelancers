import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class RestApiService implements ApiService {

	constructor(private httpClient: HttpClient) { }
  
	getAllUsers() {
		// let url = 'https://cdn-freelancers.herokuapp.com/user/all';
		let baseUrl = 'http://localhost:3000/'
		let url = baseUrl + 'user/all';
		return this.httpClient.get(url, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Content-Type': 'application/json',
			}
		});
	}
}
