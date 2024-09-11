import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../services/publication.service'; // Import the service

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  publications: any[] = []; // Array to store publications

  constructor(private publicationService: PublicationService) {}

  async ngOnInit() {
    try {
      // Ensure SQLiteService is initialized before fetching data
      this.publications = await this.publicationService.getPublications() || [];
      console.log('Publications retrieved:', this.publications);  // Debugging
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  }
}
