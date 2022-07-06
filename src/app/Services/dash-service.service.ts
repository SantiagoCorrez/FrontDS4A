import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashServiceService {

  constructor(private http:HttpClient) { }
  
  evaporacion(){
    return this.http.get("./assets/EVAPORACION.json",{responseType:"text"})
  }
  precipitacion(){
    return this.http.get("./assets/PRECIPITACION.json",{responseType:"text"})
  }
  bus(){
    return this.http.get("./assets/lines-bus.json")
  }
  estaciones(){
    return this.http.get("./assets/Estaciones_angostura.csv",{responseType:"text"})
  }
}
