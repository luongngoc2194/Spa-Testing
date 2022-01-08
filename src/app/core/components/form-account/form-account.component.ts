import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormAccountService} from '../../services/form-account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account, createAccount} from '../../model/account.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})
export class FormAccountComponent implements OnInit {

  account!: Account;
  addForm!: FormGroup;
  formMessage = false;
  isEditBtn = false;
  isCreateBtn = true;
  id!: any;

  constructor(private accountService: AccountService, public formAccountSV: FormAccountService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.isOpenAddAccount = true;
    // this.isCreateBtn = true;
    this.addForm = this.fb.group({
      account_number: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      employer: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.email, Validators.required]],
      city: [''],
      gender: ['M'],
      address: [''],
      balance: ['', [Validators.required, Validators.min(0)]],
      state: ['']
    });

    this.formAccountSV.formData$.subscribe(data => {
      if (data != null) {
        this.account = data;
        this.id = this.account._id;
        console.log(this.account);
        this.addForm.patchValue({
          account_number: this.account.account_number,
          firstname: this.account.firstname,
          lastname: this.account.lastname,
          employer: this.account.employer,
          age: this.account.age,
          email: this.account.email,
          city: this.account.city,
          gender: this.account.gender,
          address: this.account.address,
          balance: this.account.balance,
          state: this.account.state,
        });
      } else {
        this.id = null;
        this.addForm.patchValue({
          account_number: null,
          firstname: null,
          lastname: null,
          employer: null,
          age: null,
          email: null,
          city: null,
          gender: 'M',
          address: null,
          balance: null,
          state: null,
        });
      }
    });
  }

  validate(accForm: Account): boolean {
    if (accForm.account_number === '' || accForm.account_number === null) {
      this.formMessage = true;
      return false;
    } else if (accForm.lastname === '' || accForm.lastname === null) {
      this.formMessage = true;
      return false;
    } else if (accForm.email === '' || accForm.email === null) {
      this.formMessage = true;
      return false;
    } else if (parseInt(String(accForm.age), 10) < 0) {
      return false;
    } else if (parseInt(String(accForm.balance), 10) < 0) {
      return false;
    } else {
      return true;
    }
  }

  saveEdit() {
    const editedAccount = createAccount({
      balance: this.addForm.value.balance,
      age: this.addForm.value.age,
      lastname: this.addForm.value.lastname,
      firstname: this.addForm.value.firstname,
      city: this.addForm.value.city,
      account_number: this.addForm.value.account_number,
      address: this.addForm.value.address,
      email: this.addForm.value.email,
      employer: this.addForm.value.employer,
      gender: this.addForm.value.gender,
      state: this.addForm.value.state,
      _id: this.id
    });
    if (!this.validate(editedAccount)) {
      return;
    } else {
      this.accountService.editAccount(editedAccount)
        // .pipe(takeUntil(this.unSubscribeAll))
        .subscribe((resp: Account[]) => {
          this.formAccountSV.reloadList$.next();
          this.formAccountSV.isOpenFrom = false;
        }, (err: Error) => {
          // this.account = [];
        });
    }
  }

  saveNew() {
    const newAccount = createAccount({
      balance: this.addForm?.value.balance,
      age: this.addForm.value.age,
      lastname: this.addForm?.value.lastname,
      firstname: this.addForm?.value.firstname,
      city: this.addForm?.value.city,
      account_number: this.addForm?.value.account_number,
      address: this.addForm?.value.address,
      email: this.addForm?.value.email,
      employer: this.addForm?.value.employer,
      gender: this.addForm.value.gender,
      state: this.addForm?.value.state
    });


    if (!this.validate(newAccount)) {
      return;
    } else {
      this.accountService.addAccount(newAccount)
        // .pipe(takeUntil(this.unSubscribeAll))
        .subscribe((resp: Account[]) => {
          this.formAccountSV.reloadList$.next();
          this.formAccountSV.isOpenFrom = false;
        }, (err: Error) => {
          // this.account = [];
        });
    }

  }

}
