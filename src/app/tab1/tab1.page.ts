import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ViewWillEnter } from '@ionic/angular'; // Import IonViewWillEnter

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewWillEnter {
  publications: any[] = [];

  constructor(
    private publicationService: PublicationService,
    private changeDetector: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // Initial data fetch when the component initializes
    await this.refreshData();
  }

  async ionViewWillEnter() {
    // Refresh data every time the page is about to enter
    await this.refreshData();
  }

  async refreshData() {
    try {
      const allPublications = await this.publicationService.getPublications();
      console.log('All publications retrieved:', allPublications);
      this.publications = allPublications.filter(pub => pub.title && pub.description);
      console.log('Filtered publications:', this.publications);
      this.changeDetector.detectChanges(); // Force change detection if necessary
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  }

  async deletePublication(index: number): Promise<void> {
    try {
      await this.publicationService.deletePublication(index);
      this.publications.splice(index, 1);
      this.changeDetector.detectChanges(); // Force change detection if necessary
      console.log('Publication deleted');
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  }

  async clearStorage() {
    try {
      await this.publicationService.clearStorage();
      console.log('Storage cleared');
      await this.refreshData(); // Refresh data after clearing storage
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
