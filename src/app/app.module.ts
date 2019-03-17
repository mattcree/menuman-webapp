import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MenuService } from './services/menu.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuItemComponent,
    LoginComponent,
    SignUpComponent,
    MenuListComponent,
    AddMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MenuService,
    AuthService,
    AccountService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
