
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from '../servicios.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styleUrls: ['./observacion.component.css']
})
export class ObservacionComponent {
  id: string;
  report: any;
  today = new Date().toISOString().substr(0, 10);
  form: FormGroup;
  data:{}


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private services: ServiciosService,
    private fb: FormBuilder,
      ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      id:this.id,
      date: [this.today],
      description: ['', Validators.required],
    });
    

  }

  enviarObservacion() {
    
    this.services.addObservations(this.form.value)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(["/index"])
      },
      (err: any) => {
        console.log(err);

      }
    );
  }
  
}
