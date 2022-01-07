import {Component, OnInit} from '@angular/core';
import {Account, createParamSearch} from '../../model/account.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AccountService} from '../../services/account.service';
import {Accounts} from '../../data/account';
import {FormAccountService} from '../../services/form-account.service';
import {date} from 'faker';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';
  isLoading = false;

  totalLength: any;
  page = 1;
  perPage = 10;
  openDeletePopup = false;
  deleteAcc!: Account;

  constructor(private accountService: AccountService, private formAccountSV: FormAccountService) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.getAllAccount();
    }, 1000);

    this.formAccountSV.reloadList$.subscribe(() => {
      this.getAllAccount();
    });
    this.formAccountSV.formSearch$.subscribe(param => {
      console.log(param);
      this.isLoading = true;
      this.accountService.getAccounts(param).subscribe(data => {
        console.log(data);
        this.account = data;
        this.isLoading = false;
      });
    });
  }

  getAllAccount(): void {

    this.accountService.getAccounts(createParamSearch({
      last_name: this.searchStr,
      start: 0,
      limit: 100
    }))
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {

        this.account = resp;
        this.isLoading = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }

  openEdit(acc: Account): void {
    this.formAccountSV.formData$.next(acc);
    this.formAccountSV.isOpenFrom = true;
  }


  delete() {
    this.accountService.deleteAccount(this.deleteAcc).pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
      }, (err: Error) => {
        this.account = [];
      });
  }

  openDelete(account: Account) {
    this.openDeletePopup = true;
    this.deleteAcc = account;
  }
}
