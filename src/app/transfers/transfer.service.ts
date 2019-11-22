import { Injectable } from '@angular/core';
import { Trans } from './trans.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  url = 'http://localhost:3000/transfers/';
  transfersChanged = new Subject<Trans[]>();

  constructor(private httpClient:HttpClient) { }

  fetchTransfers() {
    this.httpClient.get<Trans[]>(this.url).subscribe(trs => {
      trs.forEach(tr => tr.accno = tr.accno + '.');
      this.transfersChanged.next(trs)
    })
  }
}
