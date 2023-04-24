import { Component } from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';
import { ServiciosService } from '../servicios.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  form: FormGroup;
  submit:boolean;

constructor(private servicios:ServiciosService, private router:Router){

}
ngOnInit(): void {

  this.form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });


  }
  enviarReporte() {
    // this.submit = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // try {
    //   this.servicios.login(this.form.value,this.form.value)
    // }catch (err){
    //   console.log(err)
    // }
    
    this.router.navigate(['/index'])

}
  }

