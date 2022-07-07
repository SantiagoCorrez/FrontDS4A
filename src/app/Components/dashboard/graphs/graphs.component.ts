import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { DashServiceService } from 'src/app/Services/dash-service.service';
import * as mm from "../../../../assets/Colombia.geo.json";
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  data: any[] = [];
  evaporacion:any = []
  estacion="21115020"
  param="two"
  precipitacion: any;
  date1:any=""
  date2:any=""
  constructor(private dashService: DashServiceService) { }

  async ngOnInit() {
    this.dashService.evaporacion().toPromise().then(res => {
      this.evaporacion = JSON.parse(res.replace(/\[\]/gi, "").replace(/\]\[/gi, ","))
      this.lineChart(this.evaporacion.filter((ele:any)=>ele.Caudal==this.estacion).map((ele:any)=>[ele.DiaHora,ele.EVAPORACION]),"Evaporacion")
    })
    this.dashService.precipitacion().toPromise().then(res=>{
      this.precipitacion = JSON.parse(res.replace(/\[\]/gi, "").replace(/\]\[/gi, ","))
    })
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
    this.loading(data)
  }
  loading(data: any) {
    var myChart = echarts.init(document.getElementById('main')!);
    // Draw the chart

    myChart.showLoading()
    let map: any = mm;
    echarts.registerMap("COL", map, {})
    myChart.setOption({
      tooltip: {
        position: 'top'
      },
      geo: {
        tooltip: {
          show: false
        },
        map: 'COL',
        roam: true
      },
      visualMap: {
        show: true,
        top: 'top',
        seriesIndex: 0,
        calculable: true,
        inRange: {
          color: ['blue', 'blue', 'green', 'yellow', 'red']
        }
      },
      series: [{
        id: 'population',
        type: 'heatmap',
        coordinateSystem: 'geo',
        geoIndex: 0,
        pointSize: 5,
        blurSize: 6,
        itemStyle: {
          color: '#b02a02'
        },
        data: data
      }
      ]
    })
    myChart.hideLoading()
  }
  lineChart(data: any,title:any) {
    var myChart = echarts.init(document.getElementById(title)!);
    // Draw the chart

    myChart.showLoading()
    let map: any = mm;
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        position: function (pt:any) {
          return [pt[0], '10%'];
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          type: 'inside',
          start: 98,
          end: 100
        },{
          start: 0,
          end: 20
        }
      ],
      series: [
        {
          data:data,
          type: 'bar',
          barWidth: '2%'
        },
        {
          symbolSize: 5,
          name: title,
          type: 'scatter',
          smooth: true,
          data: data
        }
      ]
    })
    myChart.hideLoading()
  }
  parameters(event:any){
      let dataPre = this.precipitacion.filter((ele:any)=>ele.Caudal==this.estacion)
      if(this.date1!="" && this.date2!=""){
        dataPre=dataPre.filter((ele:any)=>new Date(ele.DiaHora).getTime() >= new Date(this.date1).getTime() && new Date(ele.DiaHora).getTime() <= new Date(this.date2).getTime() )
      }else if(this.date1!=""){
        dataPre=dataPre.filter((ele:any)=>new Date(ele.DiaHora).getTime() >= new Date(this.date1).getTime() )
      }else if(this.date2!=""){
        dataPre=dataPre.filter((ele:any)=>new Date(ele.DiaHora).getTime() <= new Date(this.date2).getTime() )
      }
      this.lineChart(dataPre.map((ele:any)=>[ele.DiaHora,ele.PRECIPITACION]),"Precipitacion")
    
      let data = this.evaporacion.filter((ele:any)=>ele.Caudal==this.estacion)
      if(this.date1!="" && this.date2!=""){
        data=data.filter((ele:any)=>new Date(ele.DiaHora).getTime() >= new Date(this.date1).getTime() && new Date(ele.DiaHora).getTime() <= new Date(this.date2).getTime() )
      }else if(this.date1!=""){
        data=data.filter((ele:any)=>new Date(ele.DiaHora).getTime() >= new Date(this.date1).getTime() )
      }else if(this.date2!=""){
        data=data.filter((ele:any)=>new Date(ele.DiaHora).getTime() <= new Date(this.date2).getTime() )
      }
      this.lineChart(data.map((ele:any)=>[ele.DiaHora,ele.EVAPORACION]),"Evaporacion")
  }
}
