import { Component, Input, OnInit } from '@angular/core';
import { faPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../api.service';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
	selector: 'app-user-grid',
	templateUrl: './user-grid.component.html',
	styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {
	@Input() apiService: ApiService;  
	
	public faPlus = faPlus;
	public faSyncAlt = faSyncAlt;
	public closeResult = '';
	
	public gridApi;
	public gridColumnApi;
	public columnDefs;
	public defaultColDef;
	public rowData;
	public overlayLoadingTemplate;
	public overlayNoRowsTemplate;
	public frameworkComponents;
	
	userForm: FormGroup;

	constructor(private modalService: NgbModal) {
		
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
		
		this.loadForm();
	}
	
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;

		this.loadData();
	  }
	
	loadData(): void {
		this.gridApi.showLoadingOverlay();
		this.apiService.getAllUsers().subscribe((data)=>{
			this.rowData = (data && data.data && data.data.users) ? data.data.users : data;
			
			if (this.rowData.length > 0) {
				this.gridApi.hideOverlay();
			} else {
				this.gridApi.showNoRowsOverlay();
			}
		});
	}
	
	private loadForm() {
		this.userForm = new FormGroup({          
			'username': new FormControl(null),
			'email': new FormControl(null),
			'phone': new FormControl(null),
			'skillsets': new FormControl(null),
			'hobby': new FormControl(null),
		});
	}
	
	create() {
		let user = this.userForm.value;
		let skillsets = (typeof this.userForm.value.skillsets == 'string') ? this.userForm.value.skillsets.split(',') : this.userForm.value.skillsets;
		let hobby = (typeof this.userForm.value.hobby == 'string') ? this.userForm.value.hobby.split(',') : this.userForm.value.hobby;
		
		user.skillsets = skillsets;
		user.hobby = hobby;
		
		let result = this.apiService.createUser(user).subscribe(
			success => { 
				alert('User created');
				this.loadData();
				this.loadForm();
			},
			error => alert(error)
		);
	}
	
	open(content) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
	
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
