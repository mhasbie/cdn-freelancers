import { Component, OnInit } from '@angular/core';
import { ICellRenderer } from 'ag-grid-community';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements ICellRenderer  {

	private params: any;

	agInit(params): void {
		this.params = params;
	}
	
	refresh(params): boolean {
		return true;
	}

}
