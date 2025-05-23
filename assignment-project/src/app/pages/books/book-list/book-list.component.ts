import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  goToEditBook(id: number) {
    this.router.navigate(['/edit', id]);
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

  deleteBook(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.books = this.books.filter((book) => book.id !== id);

            Swal.fire({
              icon: 'success',
              title: 'Deleted !',
              text: 'The Book has been deleted successfully!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          },
          error: () => {
            Swal.fire('Error', 'Failed to delete the book.', 'error');
          },
        });
      }
    });
  }
}
