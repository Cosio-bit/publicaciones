import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component'; // Adjust path if necessary
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class Tab1Page implements OnInit, ViewWillEnter {
  publications: any[] = [];

  constructor(
    private publicationService: PublicationService,
    private changeDetector: ChangeDetectorRef,
    private modalController: ModalController,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  async ngOnInit() {
    await this.refreshData();
  }

  async ionViewWillEnter() {
    await this.refreshData();
  }

  async refreshData() {
    try {
      const allPublications = await this.publicationService.getPublications();
      console.log('All publications retrieved:', allPublications);
      this.publications = allPublications.filter(pub => pub.title && pub.description);
      console.log('Filtered publications:', this.publications);
      this.changeDetector.detectChanges();
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  }

  async deletePublication(index: number): Promise<void> {
    const modal = await this.modalController.create({
      component: DeleteConfirmationModalComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmed) {
      try {
        await this.publicationService.deletePublication(index);
        this.publications.splice(index, 1);
        this.changeDetector.detectChanges();
        console.log('Publication deleted');
      } catch (error) {
        console.error('Error deleting publication:', error);
      }
    }
  }

  async clearStorage() {
    try {
      await this.publicationService.clearStorage();
      console.log('Storage cleared');
      await this.refreshData();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }
}
