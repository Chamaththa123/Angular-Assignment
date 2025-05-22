import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  newBook = {
    title: '',
    author: '',
    isbn: '',
  };

  successMessage = '';

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit() {
     if (!this.newBook.title.trim() || !this.newBook.author.trim()) {
    Swal.fire('Error', 'Please fill in all required fields', 'error');
    return;
  }
    this.bookService.addBook(this.newBook).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Book Added',
          text: 'Your book has been added successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add book',
        });
      }
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newBook = {
      title: '',
      author: '',
      isbn: '',
    };
  }
}