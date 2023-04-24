import { Component } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  reports:any;
  constructor( private servicios:ServiciosService ){}


ngOnInit():void{
this.cargarReportes()
}
cargarReportes(){
this.servicios.getReportes()
              .subscribe((res:any)=>{
                this.reports=res;
              },(err:any)=>{
                console.log(err)
})
}

  eliminarReporte(id){
    this.servicios.deleteReport(id)
                  .subscribe((res:any)=>{
                    this.cargarReportes();
                  },(err:any)=>{
                    console.log(err)
                  })  
                }
}
