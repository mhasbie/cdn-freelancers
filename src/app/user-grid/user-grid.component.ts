import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
	selector: 'app-user-grid',
	templateUrl: './user-grid.component.html',
	styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
	@Input() apiService: ApiService;  
	
	public gridApi;
	public gridColumnApi;
  
	public columnDefs;
	public defaultColDef;
	public rowData;
	public overlayLoadingTemplate;
	public overlayNoRowsTemplate;
	public frameworkComponents;

	constructor() {
		
		this.defaultColDef = {
			editable: false,
			sortable: true,
			flex: 1,
			minWidth: 100,
			filter: true,
			resizable: true,
		};
		
		this.rowData = [];
		
		this.frameworkComponents = {
			'actionButtonComponent': ActionButtonComponent,
		};
		
		this.overlayLoadingTemplate =
			'<span class="ag-overlay-loading-center">Please wait while data is loading</span>';
		this.overlayNoRowsTemplate =
			'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">No data</span>';
	}

	ngOnInit(): void {
		this.columnDefs = [
			{ headerName: 'Username', field: 'username' },
			{ headerName: 'Email', field: 'email' },
			{ headerName: 'Phone', field: 'phone' },
			{ headerName: 'Skill Sets', field: 'skillsets', sortable: false },
			{ headerName: 'Hobby', field: 'hobby', sortable: false },
			{ headerName: '', field: '', sortable: false, filter: false, cellRenderer: 'actionButtonComponent', cellRendererParams: {
				apiService: this.apiService
			} }
		];
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

		this.loadData();
	  }
	
	loadData(): void {
		this.gridApi.showLoadingOverlay();
		this.apiService.getAllUsers().subscribe((data)=>{
			this.rowData = data;
			
			if (data.length > 0) {
				this.gridApi.hideOverlay();
			} else {
				this.gridApi.showNoRowsOverlay();
			}
		});
	}

}
