import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class GraphQLService implements ApiService {
	
	private USERS_QUERY = gql`
		{
			users {
				id
				username
				email
				phone
				skillsets
				hobby
			}
		}
	`;

	constructor(private apollo: Apollo) { }
  
	getAllUsers() {
		let query =  this.apollo
			.watchQuery({
				query: this.USERS_QUERY
			});
		return query.valueChanges;
	}
	
	updateUser(id, user) {
		
		let mutationQuery = gql`
			mutation updateUser($id: String!, $userData: UserDto!) {
				updateUser(id: $id, userData: $userData)
			}
		`;
		
		let mutation = this.apollo
			.mutate({
				mutation: mutationQuery,
				variables: {
					id: id,
					userData: user
				}
			});
		return mutation;
	}
	
	deleteUser(id) {
		let mutationQuery = gql`
			mutation removeUser($id: String!) {
				removeUser(id: $id)
			}
		`;
		
		let mutation = this.apollo
			.mutate({
				mutation: mutationQuery,
				variables: {
					id: id
				}
			});
		return mutation;
	}
	
	createUser(user) {
		let mutationQuery = gql`
			mutation addUser($userData: UserDto!) {
				addUser(newUser: $userData) 
				{
					id
					username
					email
					phone
					skillsets
					hobby
				}
			}
		`;
		
		let mutation = this.apollo
			.mutate({
				mutation: mutationQuery,
				variables: {
					userData: user
				}
			});
		return mutation;
	}
}
