import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./core/core.module";
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesEffects } from "./core/effect/notes.effect";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from './core/reducer/notes.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'notes',
        clientId: 'webapp',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    StoreModule.forRoot({noteState: notesReducer}),
    EffectsModule.forRoot([NotesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
