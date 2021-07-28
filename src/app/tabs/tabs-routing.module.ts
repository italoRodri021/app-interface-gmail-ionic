import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mail',
        loadChildren: () => import('../pages/email/email.module').then(m => m.EmailPageModule)
      },
      {
        path: 'mail/:id',
        loadChildren: () => import('../pages/details/details.module').then(m => m.DetailsPageModule)
      },
      {
        path: 'meet',
        loadChildren: () => import('../pages/meet/meet.module').then(m => m.MeetPageModule)
      },
      {
        path: '',
        redirectTo: 'mail',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
