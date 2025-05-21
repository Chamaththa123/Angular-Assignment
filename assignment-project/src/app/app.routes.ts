import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { BookListComponent } from './pages/books/book-list/book-list.component';

export const routes: Routes = [
     {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: BookListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}