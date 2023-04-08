import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from "./shared/modules/topBar/topBar.module";
import { PersistanceService } from './shared/services/persistance.service';
import { AuthInterceptor } from './shared/services/authinterceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
        TopBarModule
    ],
    providers: [
      PersistanceService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
