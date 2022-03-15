import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';

const routes:Routes =[
{path:'pacientes', component:PacientesComponent},
{path:'paciente/:id', component:PacienteComponent},
{path:'**', pathMatch:'full', redirectTo:'pacientes'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
