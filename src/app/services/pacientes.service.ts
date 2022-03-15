import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PacienteModel } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

private url= 'https://crud-cursoangular-default-rtdb.firebaseio.com'

  constructor(private http:HttpClient) { }

  crearPaciente(paciente:PacienteModel){

    return this.http.post(`${this.url}/pacientes.json`, paciente)
    .pipe(
      map( (resp:any)=>{
        paciente.id = resp.name;
        return paciente;
      } )
    );
  }
  actualizarPaciente(paciente:PacienteModel){


    const pacienteDelServicio = {

      ...paciente
    }

    delete pacienteDelServicio.id

    return this.http.put(`${this.url}/pacientes/${paciente.id}.json`, pacienteDelServicio)
  }

  borrarPaciente(id:any){
    return this.http.delete(`${this.url}/pacientes/${id}.json`);
  }

  
  getPacientes(){
    return this.http.get(`${this.url}/pacientes.json`)
    .pipe(
      map( this.crearArreglo  )
    )
  }
  private crearArreglo(pacientesObj:any){

    const pacientes:PacienteModel[]=[]
    
    if( pacientesObj === null ){
      return [];
    }

    Object.keys( pacientesObj ).forEach(key=> {
      const paciente:PacienteModel = pacientesObj[key];
      paciente.id=key;

      pacientes.push(paciente);
    })
    
    return pacientes;

  }

  getPaciente(id:string){
    return this.http.get(`${this.url}/pacientes/${id}.json`)
  }
}


