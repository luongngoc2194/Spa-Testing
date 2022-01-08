import {Component, OnInit, VERSION} from '@angular/core';
import {AccountService} from './core/services/account.service';
import {Observable, Subject} from 'rxjs';
import {Account, createAccount, createParamSearch, ParamSearch} from './core/model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Accounts} from './core/data/account';
import * as faker from 'faker';
import {FormAccountService} from './core/services/form-account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  alLength: any;
  page = 1;
  perPage = 10;

  searchFormData!: FormGroup;
  param!: ParamSearch;

  constructor(private accountService: AccountService, public formAccountSV: FormAccountService, private fb: FormBuilder) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    // this.getAllAccount();
    this.searchFormData = this.fb.group({
      start: [''],
      limit: [''],
      last_name: [''],
      first_name: [''],
      email: [''],
      address: [''],
      gender: ['']
    });
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  searchForm() {

    this.param = {
      start: this.searchFormData.value.state || 0,
      limit: this.searchFormData.value.limit || 100,
      last_name: this.searchFormData.value.last_name,
      first_name: this.searchFormData.value.first_name,
      email: this.searchFormData.value.email,
      address: this.searchFormData.value.address,
      gender: this.searchFormData.value.gender,
    };
    this.formAccountSV.formSearch$.next(this.param);
    console.log(this.param);
  }
}
