import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{
    book: any = {};
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(this.id).subscribe({
      next: (data) => this.book = data,
      error: () => Swal.fire('Error', 'Failed to load book', 'error')
    });
  }

  onSubmit(form: any) {
     if (!this.book.title.trim() || !this.book.author.trim() || !this.book.isbn.trim()) {
        Swal.fire('Error', 'Please fill in all required fields', 'error');
        return;
      }

    this.bookService.updateBook(this.id, this.book).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Book Updated',
          text: 'Book details has been added successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: () => {
        Swal.fire('Error', 'Failed to update book', 'error');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
