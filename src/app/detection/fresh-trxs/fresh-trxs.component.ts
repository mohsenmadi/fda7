import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Alert } from '../alert.model';
import { AlertService } from '../alert.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

@Component({
  selector:'app-fresh-trxs',
  templateUrl:'./fresh-trxs.component.html',
  styleUrls:['./fresh-trxs.component.scss']
})
export class FreshTrxsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['acctno', 'date', 'name', 'amount', 'risk', 'decision'];
  dataSource = new MatTableDataSource<Alert>();
  selection = new SelectionModel<Alert>(false, null);

  alert:Alert;

  private subs: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subs = this.alertService.alertsChanged.subscribe((alerts: Alert[]) => {
      this.dataSource.data = alerts;
    })
    this.alertService.fetchAlerts();

    this.selection.onChange.subscribe(row => {
      this.onSelectAlert(row.added[0]);
    })
  }

  onSelectAlert(alert) {
    this.alert = alert;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
