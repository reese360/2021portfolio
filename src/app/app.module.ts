import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaticBackgroundComponent } from './components/static-background/static-background.component';
import { LandingViewComponent } from './views/landing-view/landing-view.component';
import { BlobControllerComponent } from './components/blob/blob.component';
@NgModule({
	declarations: [AppComponent, StaticBackgroundComponent, LandingViewComponent, BlobControllerComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
