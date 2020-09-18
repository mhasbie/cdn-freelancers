import { Component } from '@angular/core';
import { User, ApiService } from './api.service';
import { RestApiService } from './rest-api.service';
import { GraphQLService } from './graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'cdn-demo';
  
	constructor(
		public restApiService: RestApiService,
		public graphQlService: GraphQLService
	) { }
}
