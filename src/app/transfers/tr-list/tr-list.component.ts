import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Trans } from '../trans.model';
import { TransferService } from '../transfer.service';
import { AlertService } from '../../detection/alert.service';
import { DialogComponent } from '../dialog/dialog.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector:'app-tr-list',
  templateUrl:'./tr-list.component.html',
  styleUrls:['./tr-list.component.scss']
})
export class TrListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['accno', 'time', 'amount', 'beneficiary'];
  dataSource = new MatTableDataSource<Trans>();
  private subs: Subscription;

  showStyle: boolean = false;
  showHighlight: boolean = false;
  go4spin: boolean = false;
  progress = 0;
  timer: any;

  @Input() alert;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trService: TransferService,
              public dialog: MatDialog,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.subs = this.trService.transfersChanged.subscribe((trs: Trans[]) => {
      this.dataSource.data = trs;
    });
    this.trService.fetchTransfers();

    this.subs = interval(10 * 1000).subscribe(val => {
      console.log('== did update #', val)
      this.trService.transfersChanged.subscribe((trs: Trans[]) => {
        this.dataSource.data = trs;
      });
      this.trService.fetchTransfers();
    });
  }

  analyze() {
    this.go4spin = true;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.openDialog();
      }
    }, 50);
  }

  animal: string;
  name: string;

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width:'250px',
      data:{name:'somename', animal:'some animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  release() {
    this.alertService.release(this.alert);
  }

  hold() {
    this.alertService.hold(this.alert);
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
