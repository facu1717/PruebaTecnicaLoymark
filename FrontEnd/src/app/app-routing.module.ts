import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [

  {
    path: '',

    children: [
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
