import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
  }

  data = this.getData();

  async getData() {
    let data; 
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {      
      data = res;
      console.log('dataservice logging data:', data);
      
    });
    return data;
  }




}
