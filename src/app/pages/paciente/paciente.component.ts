import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PacientesService } from 'src/app/services/pacientes.service';
import { PacienteModel } from '../../models/paciente.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  paciente=new PacienteModel()

  constructor(private pacientesService:PacientesService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){

      this.pacientesService.getPaciente(id)
      .subscribe(respuesta=>{
        this.paciente = respuesta;
        this.paciente.id=id;
        
      })
    }
  }

  guardar(f:NgForm){

    if(f.invalid){
     
     console.log('Formulario No Valido')
      return;

    }

    Swal.fire({title:'Aguarde', 
               text:'Guardando Información',
               icon:'info',
              allowOutsideClick:false})
    Swal.showLoading();

    let peticion:Observable<any>;


    if(this.paciente.id){

      peticion = this.pacientesService.actualizarPaciente(this.paciente);

    }else{
     peticion = this.pacientesService.crearPaciente(this.paciente);
    }

    peticion.subscribe(respuesta =>{
      Swal.fire({
        title:this.paciente.nombre + ' ' + this.paciente.apellido,
        text: 'El paciente se actualizó correctamente',
        icon: 'success'
      })
    })
  }



}
