import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {fakeBackendProvider} from './core/services/fake-backend';
import {AccountService} from './core/services/account.service';
import {HttpClientModule} from '@angular/common/http';
import { ListAccountComponent } from './core/components/list-account/list-account.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { FormAccountComponent } from './core/components/form-account/form-account.component';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import { MyTableComponent } from './core/my-component/my-table/my-table.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, NgxPaginationModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  declarations: [AppComponent, ListAccountComponent, FormAccountComponent, MyTableComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
