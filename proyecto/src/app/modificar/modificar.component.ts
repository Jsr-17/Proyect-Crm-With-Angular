import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})

export class ModificarComponent {
  form: FormGroup;
  submit=false;
  id:string;
  report:any;
  constructor(private route:ActivatedRoute,
              private services:ServiciosService,
              private router:Router){  }


  ngOnInit(): void {
    const idUnica = uuidv4();
    this.form = new FormGroup({
      id:new FormControl(idUnica),
      name: new FormControl("", [Validators.required]),
      date: new FormControl(),
      status: new FormControl("", [Validators.required]),
      description_short: new FormControl("", [Validators.maxLength(80)]),
      description: new FormControl("", ),
    
    });
    this.id =this.route.snapshot.params['id']
    this.services.getReporte(this.id)
                  .subscribe((res:any)=>{
                    this.report=res.report
                    this.form.patchValue(this.report)
                  },(err:any)=>{
                    console.log(err)
                  })
  }
  

  enviarReporte() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }
  }
  modificarReports(){
    this.services.putReports(this.form.value,this.id)
                  .subscribe((res:any)=>{
                    console.log(res);
                    this.router.navigate(["/index"])
                  },(err:any)=>{
                    console.log(err)
                  })
              }
  }


