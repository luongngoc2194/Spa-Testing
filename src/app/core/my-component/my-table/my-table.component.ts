import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account, Columns} from '../../model/account.model';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  @Input() listColumns!: Columns[];
  @Input() account!: Account[];
  @Input() perPage!: number;

  @Output() openEdit = new EventEmitter<any>();
  @Output() openDelete = new EventEmitter<any>();

  tableRowData!: any[];
  page = 1;
  totalLength!: number;

  constructor() {
  }

  ngOnInit(): void {
    // for (const acc of this.account) {
    //   this.tableRowData = {...acc, ...this.listColumns};
    // }
  }

  openEditEvent(account: Account) {
    this.openEdit.emit(account);
  }

  openDeleteEvent(account: Account) {
    this.openDelete.emit(account);
  }
}
