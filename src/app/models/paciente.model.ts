export class PacienteModel{

    id?: string;
    nombre?:string;
    apellido?:string;
    dni?:number;
    domicilio?:string;
    localidad?:string;
    cp?:number;
    tel?:number
    fechaNac?:Date;
    nacionalidad?:string;
    estadoexamen?:boolean;
    examenes?:any[];


    constructor(){

        this.nacionalidad='Argentina',
        this.estadoexamen=false;

    }




}