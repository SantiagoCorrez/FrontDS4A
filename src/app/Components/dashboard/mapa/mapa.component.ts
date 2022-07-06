import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import { DashServiceService } from 'src/app/Services/dash-service.service';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  data: any;
  estacion:any;
  param:any = "one";
  constructor(private service: DashServiceService) { }
  parameters(event:any){

  }
  async ngOnInit() {
    let text = await (await fetch("./assets/Estaciones_angostura.csv")).text()
    let info = text.replace(/\"/gi, "").split("\n")
    var data: any[] = [
    ];
    info.shift()
    info.pop()
    info.forEach(ele => {
      var caudal = ele.split(",")
      this.data.push(caudal)
      data.push([caudal[5], caudal[4], caudal[3]])
    })
  }

}
