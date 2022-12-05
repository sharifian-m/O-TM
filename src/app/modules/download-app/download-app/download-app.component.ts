import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
window.scrollTo(0,0)

  }
downloadApp(type){
  let param=new HttpParams();
  param=param.set('AppTypeEnum',type)
this.http.get('https://api.otamin.ir/api/services/app/ForceUpdate/GetVersion',{params:param}).subscribe(
  (res:any)=>{
    let data=res.result.androidVersions[0].link;
    window.open(data)
  }
)
}
}
