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

// Import the modal component
import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component'; // Ajusta la ruta si es necesario

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationModalComponent // Asegúrate de declarar el componente del modal aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLiteService,
    PublicationService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
