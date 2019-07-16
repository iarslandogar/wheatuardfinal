import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP } from '@ionic-native/http/ngx';

import { LoginComponent} from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './Auth/auth.service';
import { TokenInterceptor } from './Auth/token.interceptor';
import { ErrorHandler,Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
@Injectable()
export class IonicErrorHandler extends ErrorHandler {

  constructor() {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);
  }
}

@NgModule({
  declarations: [AppComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, NgbModule.forRoot(), HttpClientModule],
  providers: [
    StatusBar,Camera,FileTransfer,Geolocation,
    SplashScreen,HTTP,File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } ,{provide: ErrorHandler, useClass: IonicErrorHandler},HTTP, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
