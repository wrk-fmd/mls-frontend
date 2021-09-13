import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Pageable, PageStaffMemberBriefDto, StaffMemberBriefDto} from 'mls-coceso-api';
import {DialogComponent, DialogComponentOptions} from 'mls-common-ui';
import {Subscription} from 'rxjs';
import {StaffHelper} from '../../../helpers/staff.helper';

import {StaffDataService} from '../../../services';
import {StaffEditFormComponent} from '../staff-edit/staff-edit-form.component';

@Component({
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  private readonly pageable: Pageable = {
    size: 10,
    sort: ['lastname,asc', 'firstname,asc']
  };
  private filter?: string;

  readonly filterControl: FormControl;

  readonly displayedColumns = ['personnelId', 'lastname', 'firstname', 'actions'];
  readonly dataSource = new MatTableDataSource<StaffMemberBriefDto>();

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor(private readonly staffService: StaffDataService, private readonly staffHelper: StaffHelper,
              private readonly dialog: MatDialog, fb: FormBuilder) {
    this.filterControl = fb.control(null);
    this.filterControl.valueChanges.subscribe(filter => this.updateFilter(filter));
  }

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  load() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.staffService.getAll(this.pageable, this.filter).subscribe(page => this.loadSuccess(page));
  }

  private loadSuccess(page: PageStaffMemberBriefDto) {
    if (page) {
      this.dataSource.connect().next(page.content || []);
      this.paginator!.length = page.totalElements || 0;
      this.paginator!.pageSize = page.size || 0;
      this.paginator!.pageIndex = page.number || 0;
    }
  }

  updateFilter(filter?: string) {
    filter = filter || undefined;
    if (filter !== this.filter) {
      this.filter = filter;
      this.filterControl.markAsPristine();
      this.load();
    }
  }

  updatePage(pageable: PageEvent) {
    let changed = false;
    if (this.pageable.page !== pageable.pageIndex) {
      this.pageable.page = pageable.pageIndex;
      changed = true;
    }
    if (this.pageable.size !== pageable.pageSize) {
      this.pageable.size = pageable.pageSize;
      changed = true;
    }

    if (changed) {
      this.load();
    }
  }

  openForm(member?: StaffMemberBriefDto) {
    this.dialog.open<DialogComponent, DialogComponentOptions<any>>(DialogComponent, {
      panelClass: 'dialog-window',
      disableClose: true,
      data: {component: StaffEditFormComponent, componentData: {id: member ? member.id : null, afterSaveCallback: () => this.load()}}
    });
  }
}
