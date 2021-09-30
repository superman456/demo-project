import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { DeleteUsersComponent } from './users/delete-users/delete-users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';

const routes: Routes = [
  
  {
    path: 'users',
    children: [
      { path: '', component: ListUsersComponent },
      { path: 'list', component: ListUsersComponent },
      { path: 'view/:id', component: ViewUsersComponent },
      { path: 'edit/:id', component: EditUsersComponent },
      { path: 'delete/:id', component: DeleteUsersComponent },
      { path: 'create', component: AddUsersComponent }

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
