import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private db: any;

  constructor(private sqliteService: SQLiteService) {
    this.initializeDB();
  }

  private async initializeDB() {
    this.db = await this.sqliteService.getDB();
  }

  async addPublication(publication: any) {
    if (this.db) {
      const insertSQL = `
        INSERT INTO publications (title, subtitle, description, photo)
        VALUES (?, ?, ?, ?)
      `;
      this.db.run(insertSQL, [publication.title, publication.subtitle, publication.description, publication.photo]);
    }
  }

  async getPublications() {
    if (this.db) {
      const selectSQL = 'SELECT * FROM publications';
      const result = this.db.exec(selectSQL);
      // Result is an array of results, where each result is an object containing columns and values
      if (result.length > 0) {
        return result[0].values;
      }
    }
    return [];
  }
}
