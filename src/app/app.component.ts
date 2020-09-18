import { Component } from '@angular/core';
import { User, ApiService } from './api.service';
import { RestApiService } from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'cdn-demo';
  
	constructor(
		public restApiService: RestApiService
	) { }
}
