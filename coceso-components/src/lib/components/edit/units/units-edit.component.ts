import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

import {UnitDto} from 'mls-coceso-api';
import {DialogComponent, DialogComponentOptions} from 'mls-common-ui';

import {Subscription} from 'rxjs';

import {UnitDataService} from '../../../services';
import {UnitEditFormComponent} from '../unit/unit-edit-form.component';

@Component({
  selector: 'coceso-edit-units',
  templateUrl: './units-edit.component.html'
})
export class UnitsEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  readonly displayedColumns = ['call', 'properties', 'section', 'home', 'info', 'type', 'actions'];
  readonly units = new MatTableDataSource<UnitDto>();

  constructor(private readonly unitService: UnitDataService, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription = this.unitService.getAll().subscribe(units => this.units.data = units);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openForm(unit?: UnitDto) {
    this.dialog.open<DialogComponent, DialogComponentOptions<any>>(DialogComponent, {
      panelClass: 'dialog-window',
      disableClose: true,
      data: {component: UnitEditFormComponent, componentData: {id: unit ? unit.id : null}}
    });
  }
}
