import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service';
import { ChangeDetectorRef } from '@angular/core'; // Importa ChangeDetectorRef

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  publications: any[] = [];

  constructor(
    private publicationService: PublicationService,
    private changeDetector: ChangeDetectorRef // Injecta ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      const allPublications = await this.publicationService.getPublications() || [];
      this.publications = allPublications.filter(pub => pub.title && pub.description);
      console.log('Publications retrieved:', this.publications);
      this.changeDetector.detectChanges(); // Force change detection
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  }
  
  
  
}
