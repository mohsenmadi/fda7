import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './nav/header/header.component';
import { FreshTrxsComponent } from './detection/fresh-trxs/fresh-trxs.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrListComponent } from './transfers/tr-list/tr-list.component';
import { DialogComponent } from './transfers/dialog/dialog.component';
import { SidenavListComponent } from './nav/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FreshTrxsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    TrListComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
