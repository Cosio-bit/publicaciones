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
    photo: '',
    date: new Date() // Add date property
  };

  savedPublication: any;
  errors: any = {};

  constructor(private publicationService: PublicationService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.publication.photo = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  validatePublication() {
    this.errors = {};
    if (!this.publication.title) {
      this.errors.title = 'El título es obligatorio.';
    } else if (this.publication.title.length < 5) {
      this.errors.title = 'El título debe tener al menos 5 caracteres.';
    }

    if (!this.publication.description) {
      this.errors.description = 'La descripción es obligatoria.';
    } else if (this.publication.description.length < 20) {
      this.errors.description = 'La descripción debe tener al menos 20 caracteres.';
    }
  }

  async savePublication() {
    this.validatePublication();

    if (Object.keys(this.errors).length === 0) {
      this.savedPublication = { ...this.publication };
      console.log('Saved photo data:', this.publication.photo);

      await this.publicationService.addPublication(this.publication);
      console.log('Publicación guardada:', this.publication);

      const publications = await this.publicationService.getPublications();
      console.log('Publicaciones:', publications);

      // Limpiar el formulario solo después de guardar
      this.publication = {
        title: '',
        subtitle: '',
        description: '',
        photo: '',
        date: new Date()
      };
    } else {
      console.warn('No se puede guardar la publicación debido a errores');
    }
  }
}
