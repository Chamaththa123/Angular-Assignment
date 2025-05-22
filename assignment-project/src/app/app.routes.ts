import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';

export const routes: Routes = [
     {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: BookListComponent },
      { path: 'add-book', component: AddBookComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}