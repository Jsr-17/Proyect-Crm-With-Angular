import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ServiciosService } from '../servicios.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-nuevo-reactive',
  templateUrl: './nuevo-reactive.component.html',
  styleUrls: ['./nuevo-reactive.component.css']
})
export class NuevoReactiveComponent {
  form: FormGroup
  today = new Date().toISOString().substr(0, 10);
  submit=false

  constructor(private servicios:ServiciosService,private router:Router){
    
  }

  ngOnInit(): void {
    const idUnica = uuidv4();
    this.form = new FormGroup({
      id:new FormControl(idUnica),
      name: new FormControl("", [Validators.required]),
      date: new FormControl(this.today),
      status: new FormControl("", [Validators.required]),
      description_short: new FormControl("", [Validators.maxLength(80)]),
      description: new FormControl("", )
    
    });
  }

  enviarReporte() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }
    this.servicios.postReportes(this.form.value)
                  .subscribe((res:any)=>{
                    console.log(res)
                    this.router.navigate(['index']);
                  },(err:any)=>{
                    console.log(err)
                  })
  }
}
