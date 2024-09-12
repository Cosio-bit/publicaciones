import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component'; // Adjust path if necessary
import { DatePipe } from '@angular/common'; // Import DatePipe
import { Router } from '@angular/router';

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
    private datePipe: DatePipe, // Inject DatePipe
    private router: Router
  ) {}

  // Navigate to Tab 2
  async goToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }

  // Initialize data on component load
  async ngOnInit() {
    await this.refreshData();
  }

  // Refresh data when view is about to enter
  async ionViewWillEnter() {
    await this.refreshData();
  }

  // Fetch and filter publications
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

  // Delete a publication and handle confirmation
  async deletePublication(index: number): Promise<void> {
    const modal = await this.modalController.create({
      component: DeleteConfirmationModalComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmed) {
      try {
        // Ensure the correct identifier is passed to deletePublication method
        const publicationId = this.publications[index]?.id; // Adjust if necessary
        if (publicationId) {
          await this.publicationService.deletePublication(publicationId);
          this.publications.splice(index, 1);
          this.changeDetector.detectChanges();
          console.log('Publication deleted');
        } else {
          console.error('Publication ID not found');
        }
      } catch (error) {
        console.error('Error deleting publication:', error);
      }
    }
  }

  // Clear all publications from storage
  async clearStorage() {
    try {
      await this.publicationService.clearStorage();
      console.log('Storage cleared');
      await this.refreshData();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Format date using DatePipe
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }
}
