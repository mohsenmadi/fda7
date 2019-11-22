import { Injectable } from '@angular/core';
import { Alert } from './alert.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert[];
  alertsChanged = new Subject<Alert[]>();

  constructor(private db: AngularFirestore) {
  }

  hold(alert) {
    this.update(alert.id, 'hold');
  }

  release(alert) {
    this.update(alert.id, 'release');
  }

  update(id, decision) {

    let alert = this.alerts.find(alert => alert.id === id);
    alert.decision = alert.decision == decision ? '' : decision;

    this.db.doc<Alert>(`alerts/${id}`)
      .update({
        decision:alert.decision
      });

    this.alertsChanged.next(this.alerts);
  }

  fetchAlerts() {
    this.db
      .collection('alerts')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => ({
            id:action.payload.doc.id,
            ...action.payload.doc.data()
          }));
        }))
      .subscribe((alerts: Alert[]) => {
        alerts.forEach(a => a.date = new Date());
        this.alerts = alerts;
        this.alertsChanged.next(this.alerts);
      });
  }
}
