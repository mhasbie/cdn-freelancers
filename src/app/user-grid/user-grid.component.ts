import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.less']
})
export class UserGridComponent implements OnInit {
	@Input() apiService: ApiService;  
	
	users = [];

	constructor() { }

	ngOnInit(): void {
		console.log(this.apiService);
		this.apiService.getAllUsers().subscribe((data)=>{
			// console.log(data);
			this.users = data;
		});
	}

}
