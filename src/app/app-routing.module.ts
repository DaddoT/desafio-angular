import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersInfoComponent } from './users-info/users-info.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersSearchComponent } from './users-search/users-search.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Lista de Usuários' }
  },
  {
    path: 'users-info/: id',
    component: UsersInfoComponent,
    data: { title: 'Informações de Usuários' }
  },
  {
    path: 'users-new',
    component: UsersNewComponent,
    data: { title: 'Adicionar Usuário' }
  },
  {
    path: 'users-search',
    component: UsersSearchComponent,
    data: { title: 'Pesquisar Usuário' }
  },
  {
    path: 'users-edit/: id',
    component: UsersEditComponent,
    data: { title: 'Editar Usuário' }
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
