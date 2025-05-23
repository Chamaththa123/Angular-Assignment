import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
private apiUrl = 'https://localhost:44327/api/Book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: any) {
  return this.http.post<Book>(this.apiUrl, book);
}

getBookById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

updateBook(id: number, data: any) {
  return this.http.put<any>(`${this.apiUrl}/${id}`, data);
}

deleteBook(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}



}
