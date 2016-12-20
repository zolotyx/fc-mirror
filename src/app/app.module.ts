import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { FIREBASE_PROVIDERS, defaultFirebase } from "angularfire2";
import { AuthMethods } from "angularfire2";
import { AuthProviders } from "angularfire2";
import { firebaseAuthConfig } from "angularfire2";
import { LoginPage } from "../pages/auth/login/login";
import { RegisterPage } from "../pages/auth/register/register";
import { NotePage } from "../pages/note/note";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    LoginPage,
    RegisterPage,
    ContactPage,
    NotePage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    LoginPage,
    RegisterPage,
    ContactPage,
    NotePage,
    HomePage
  ],
  providers: [

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FIREBASE_PROVIDERS,
    defaultFirebase({
      apiKey: "AIzaSyAW6AzR_s-JkRqkrnv54qhNoe1ShiSZ-Eg",
      authDomain: "fc-mirror.firebaseapp.com",
      databaseURL: "https://fc-mirror.firebaseio.com",
      storageBucket: "fc-mirror.appspot.com",
    }),
    firebaseAuthConfig({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
      scope: ['email']
    })
  ]
})
export class AppModule {}
