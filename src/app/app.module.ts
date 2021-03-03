import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaticBackgroundComponent } from './components/static-background/static-background.component';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { BlobControllerComponent } from './components/blobController/blobController.component';
import { NavLinkComponent } from './components/ux/nav-link/nav-link.component';
import { ThemerComponent } from './components/ux/themer/themer.component';
import { AboutViewComponent } from './views/about-view/about-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
	declarations: [AppComponent, StaticBackgroundComponent, LandingViewComponent, BlobControllerComponent, NavLinkComponent, ThemerComponent, AboutViewComponent, NavbarComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
