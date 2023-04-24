import {FormGroup, FormControl,Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../servicios.service';


@Component({
  selector: 'app-lector-mensajes',
  templateUrl: './lector-mensajes.component.html',
  styleUrls: ['./lector-mensajes.component.css']
})
export class LectorMensajesComponent {
  form: FormGroup;
    id:string;
    report:any;
    datos:any;
  constructor(private route:ActivatedRoute,private services:ServiciosService){

  }

ngOnInit():void{
  this.id =this.route.snapshot.params['id']
  this.services.getReporte(this.id)
                .subscribe((res:any)=>{
                  this.report=res.report
                  this.form.patchValue(this.report)
                  this.datos=this.report.observaciones

                },(err:any)=>{
                })
                this.form = new FormGroup({
                  id:new FormControl(),
                  name: new FormControl({value:"" ,disabled: true} ,[Validators.required]),
                  date: new FormControl({value:"",disabled: true}),
                  status: new FormControl({value:"" ,disabled: true}, [Validators.required]),
                  description_short: new FormControl({value:"" ,disabled: true}, [Validators.maxLength(40)]),
                  description: new FormControl({value:"" ,disabled: true},Validators.required),
                  
                })


              }
              getReporte(){
                this.services.getReportes()
                              .subscribe((res:any)=>{
                                console.log(res);
                              
                              },(err:any)=>{
                                console.log(err)
                              })
                          }
            }