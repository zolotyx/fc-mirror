import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MenuController } from "ionic-angular";
import { HomePage } from "../pages/home/home";
import { ContactPage } from "../pages/contact/contact";
import { AboutPage } from "../pages/about/about";
import { Nav } from "ionic-angular";
import { ViewChild } from "@angular/core/src/metadata/di";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;
  private pages: any[];
  constructor(platform: Platform,
              private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'Contact', component: ContactPage },
      { title: 'About', component: AboutPage },
      // { title: 'Log Out', component: LogoutPage }
    ];
  }

  openPage(page) {
    // this.menu.close();
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    this.nav.push(page.component);
  }
}
