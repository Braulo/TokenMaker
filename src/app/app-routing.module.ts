import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erc20Component } from './components/erc20/erc20.component';
import { Erc721Component } from './components/erc721/erc721.component';

const routes: Routes = [
  {
    path: 'erc20',
    component: Erc20Component,
  },
  {
    path: 'erc721',
    component: Erc721Component,
  },
  {
    path: '**',
    redirectTo: 'erc20',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
