import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  pacientes:PacienteModel[]=[]
  cargando=false;
  constructor(private pacientesService:PacientesService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.pacientesService.getPacientes()
    .subscribe(respuesta=> {
      this.cargando=false;
      this.pacientes = respuesta
    });
  }

  borrarPaciente(paciente:PacienteModel, i:number){
    Swal.fire({
      title:'Está seguro?',
      text: `Está seguro de eliminar a ${paciente.nombre} ${paciente.apellido}`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then(respuesta=>{
      if(respuesta.value){
        this.pacientesService.borrarPaciente( paciente.id ).subscribe();
        this.pacientes.splice(i,1);
      }
    })


  }

}




