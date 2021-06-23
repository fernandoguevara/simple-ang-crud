import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from "../../data/model/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  apiURL = "http://localhost/notes"

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiURL);
  }

  getNote(id: string): Observable<Note>{
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Note>(url);
  }

  createNote(note: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiURL, note);
  }

  deleteNote(id: string): Observable<unknown>{
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }

  updateNote(id: string, note: Partial<Note>){
    const url = `${this.apiURL}/${id}`;

    return this.http.put(url, {
        title: note.title,
        description: note.description
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
