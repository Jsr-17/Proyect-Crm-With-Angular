import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map,Observable, throwError } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(  private http:HttpClient,private route:ActivatedRoute) { }
  endpointReports:string= "http://localhost:3000"
  id:string
  

    login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.endpointReports}/login`, { email, password });
  }

    getReportes(){
      return this.http.get(this.endpointReports)
                      .pipe(
                        map((data:any)=>{
                          return data;
                        })
                      )
  }

    addObservations(data: any,): Observable<any> {
      const url = `${this.endpointReports}/observation/${data.id}`;
      const observacion = { "observacion": data.description,"fecha":data.date};
    
      return this.http.post(url,observacion).pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
    }

  postReportes(reports){
    return this.http.post(this.endpointReports,reports)
                    .pipe(
                      map((data:any)=>{
                        return data;
                      })
                    )
  }

  getReporte(id){
    return this.http.get(this.endpointReports + '/' + id)
                    .pipe(
                      map((data:any)=>{
                        return data;
                      })
                    )
  }
  putReports(report,id){
    return this.http.put(this.endpointReports + "/" + id,report)
                    .pipe(
                      map((data:any)=>{
                        return data;
                      })
                    )    
                  }
  deleteReport(id){
    return this.http.delete(this.endpointReports + "/" + id)
                    .pipe(
                      map((data:any)=>{
                        return data;
                      })
                    ) 
  }
}
