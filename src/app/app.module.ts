import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGridComponent } from './user-grid/user-grid.component';
import { ActionButtonComponent } from './action-button/action-button.component';

@NgModule({
  declarations: [
    AppComponent,
    UserGridComponent,
    ActionButtonComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule,
    NgbModule,
	AgGridModule.withComponents([ActionButtonComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
