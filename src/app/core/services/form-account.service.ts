import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ParamSearch} from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class FormAccountService {

  isOpenFrom = false;
  formData$ = new Subject<any>();
  reloadList$ = new Subject<any>();
  formSearch$ = new Subject<ParamSearch>();

  constructor() {
  }


  // form: FormGroup = new FormGroup({
  //   account_number: new FormControl('', Validators.required),
  //   firstname: new FormControl('', Validators.required),
  //   lastname: new FormControl('', Validators.required),
  //   employer: new FormControl('', Validators.required),
  //   age: new FormControl(''),
  //   email: new FormControl('', Validators.email),
  //   city: new FormControl(''),
  //   gender: new FormControl(''),
  //   address: new FormControl(''),
  //   balance: new FormControl(''),
  //   state: new FormControl('')
  // });
  //
  // initializeFormGroup(): void {
  //   this.form.setValue({
  //     account_number: 6,
  //     balance: 5686,
  //     firstname: 'Hattie',
  //     lastname: 'Bond',
  //     age: 36,
  //     gender: 'M',
  //     address: '671 Bristol Street',
  //     employer: 'Netagy',
  //     email: 'hattiebond@netagy.com',
  //     city: 'Dante',
  //     state: 'TN'
  //   });
  // }

  //
  // getEmployees() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }
  //
  // insertEmployee(employee) {
  //   this.employeeList.push({
  //     account_number: employee.account_number,
  //     balance: employee.balance,
  //     firstname: employee.firstname,
  //     lastname: employee.lastname,
  //     age: employee.age,
  //     gender: employee.gender,
  //     address: employee.address,
  //     employer: employee.employer,
  //     email: employee.email,
  //     city: employee.city,
  //     state: employee.state
  //   });
  // }
  //
  // updateEmployee(employee) {
  //   this.employeeList.update(employee.$key,
  //     {
  //       fullName: employee.fullName,
  //       email: employee.email,
  //       mobile: employee.mobile,
  //       city: employee.city,
  //       gender: employee.gender,
  //       department: employee.department,
  //       hireDate: employee.hireDate == '' ? '' : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
  //       isPermanent: employee.isPermanent
  //     });
  // }
  //
  // deleteEmployee($key: string) {
  //   this.employeeList.remove($key);
  // }
  //
  // populateForm(employee) {
  //   this.form.setValue(_.omit(employee, 'departmentName'));
  // }
}
