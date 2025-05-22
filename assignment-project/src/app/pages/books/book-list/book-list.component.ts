import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private bookService: BookService, private router: Router) {}

  goToAddBook() {
    this.router.navigate(['/add-book']);
  }

  ngOnInit(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books';
        this.loading = false;
      },
    });
  }
}
