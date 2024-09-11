import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Ionic Storage
import { IonicStorageModule } from '@ionic/storage-angular';

// Import the services
import { SQLiteService } from './services/sqlite.service';
import { PublicationService } from './services/publication.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // Import IonicStorageModule and initialize it
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLiteService, // Add SQLiteService here
    PublicationService // Add PublicationService here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
