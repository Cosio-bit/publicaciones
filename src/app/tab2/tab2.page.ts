import { Component } from '@angular/core';
import { PublicationService } from '../services/publication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  publication = {
    title: '',
    subtitle: '',
    description: '',
    photo: ''
  };

  savedPublication: any;

  constructor(private publicationService: PublicationService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.publication.photo = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  async savePublication() {
    this.savedPublication = { ...this.publication };
    await this.publicationService.addPublication(this.publication);
    console.log('Saving publication:', this.publication);

    const publications = await this.publicationService.getPublications();
    console.log('Publications:', publications);

    this.publication = {
      title: '',
      subtitle: '',
      description: '',
      photo: ''
    };
  }
}
