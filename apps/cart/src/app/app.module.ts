import { BrowserModule, Title, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { CookieLawModule } from 'angular2-cookie-law';
import { NgDialogAnimationService } from "ng-dialog-animation";
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ProdutoService } from './data/service';
import { environment } from '../environments/environment';

import { CheckoutService } from './modules/checkout/checkout.service';
import { DocumentRef } from './shared/services/document.service';
import { WindowRef } from './shared/services/window.service';
import { PageScrollService } from './shared/services/page-scroll.service';
import { BaseService } from './data/service/base/base.service';
import { States } from './data/store/state';
import { LayoutModule } from './modules/layout/layout.module';

NgxsModule.forRoot(States, { developmentMode: !environment.production })
@NgModule({
  declarations: [AppComponent],
  imports:
  [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    LayoutModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    HammerModule,
    CookieLawModule,
    ImageViewerModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxsModule.forRoot(States),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled:true
    }),
  ],
  providers: [
    NgDialogAnimationService,
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: WindowRef },
    { provide: DocumentRef },
    { provide: BaseService },
    { provide: ProdutoService },
    { provide: PageScrollService },
    { provide: ErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
