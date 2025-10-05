import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/clients',
        pathMatch: 'full'
    },
    {
        path: 'clients',
        loadComponent: () => import('./components/clients/list/list.component').then(m => m.ListComponent)
    },
    {
        path: 'clients/create',
        loadComponent: () => import('./components/clients/create/create.component').then(m => m.CreateComponent)
    },
    { 
        path: 'clients/edit/:id',
        loadComponent: () => import('./components/clients/edit/edit.component').then(m => m.EditComponent)
    }
];
