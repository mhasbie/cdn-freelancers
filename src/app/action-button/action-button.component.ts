import { Component, OnInit } from '@angular/core';
import { ICellRenderer } from 'ag-grid-community';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements ICellRenderer  {

	private params: any;
	
	public data;
	public faEdit = faEdit;
	public faTrash = faTrash;
	
	public closeResult = '';
	
	userForm: FormGroup;
	
	constructor(private modalService: NgbModal) {}

	agInit(params): void {
		this.params = params;
		this.data = params.data;
		
		this.loadForm();
	}
	
	refresh(params): boolean {
		this.loadForm();
		return true;
	}
	
	open(content) {
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
	
	save() {
		// console.log(this.data);
		let user = this.userForm.value;
		let skillsets = (typeof this.userForm.value.skillsets == 'string') ? this.userForm.value.skillsets.split(',') : this.userForm.value.skillsets;
		let hobby = (typeof this.userForm.value.hobby == 'string') ? this.userForm.value.hobby.split(',') : this.userForm.value.hobby;
		
		user.skillsets = skillsets;
		user.hobby = hobby;
		
		let result = this.params.apiService.updateUser(this.data.id, user).subscribe(
			success => { 
				alert('User updated');
				this.refreshData();
			},
			error => alert(error)
		);
	}
	
	delete() {
		if (confirm('Confirm delete user?')) {
			this.params.apiService.deleteUser(this.data.id).subscribe(
				success => { 
					alert('User deleted');
					this.refreshData();
				},
				error => alert(error)
			);
		} else {
			// Do nothing!
		}
	}
	
	private loadForm() {
		this.userForm = new FormGroup({          
			'username': new FormControl(this.data.username),
			'email': new FormControl(this.data.email),
			'phone': new FormControl(this.data.phone),
			'skillsets': new FormControl(this.data.skillsets),
			'hobby': new FormControl(this.data.hobby),
		});
	}
	
	private refreshData() {
		this.params.apiService.getAllUsers().subscribe((data) => {
			let newData = (data && data.data && data.data.users) ? data.data.users : data;
			this.params.api.setRowData(newData);
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
