import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { icon, latLng, marker, tileLayer } from 'leaflet';
import * as L from "leaflet";
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {
  @Output() sendLocation=new EventEmitter();
  @Input() isShow:boolean=false;

  @Input() lat:number=35.7564;
  @Input() lng:number=51.3759;
  layers:any;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      marker([ this.lat,this.lng ],{
        icon: icon({
          iconSize: [ 30, 30 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '/assets/icons/marker.png',

        })
      } ).on('click', this.setLaLng.bind(this))
    ],
    zoom: 20,
    center: latLng(this.lat,this.lng),


  };
  constructor() { }

  ngOnInit(): void {
  }
  setLaLng(event){
  this.lat=event.latlng.lat;
  this.lng=event.latlng.lng;
  this.options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      marker([ this.lat,this.lng ],{
        icon: icon({
          iconSize: [ 30, 30 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: '/assets/icons/marker.png',

        })
      } ).on('click', this.setLaLng.bind(this))
    ],
    zoom: 20,
    center: latLng(this.lat,this.lng),


  };
  this.sendLocation.emit({lat:this.lat,lng:this.lng,isShow:this.isShow});
  this.isShow=false;


  }

}
