import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {

   // Base URL for the Book API
  private apiUrl = 'https://localhost:44327/api/Book';

  constructor(private http: HttpClient) {}

  //Fetches all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  //add new book
  addBook(book: any) {
    return this.http.post<Book>(this.apiUrl, book);
  }

  //get specific by id
  getBookById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //update book
  updateBook(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  //delete book
  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
