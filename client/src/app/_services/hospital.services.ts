import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Hospital} from '../shared/hospital';
import {Department} from '../shared/department';
import {BehaviorSubject} from 'rxjs';


import { environment } from '../../environments/environment';
const baseUrl = `${environment.apiUrl}/users`;
@Injectable({ providedIn: 'root' })

export class HospitalService {
    dialogData: any;
    dataChange: BehaviorSubject<Hospital[]> = new BehaviorSubject<Hospital[]>([]);


constructor(
    private router: Router,
    private http: HttpClient
){}


getDialogData() {
    return this.dialogData;
  }

getAllHospital() {
    return this.http.get<Hospital[]>(`${baseUrl}/listOfHospitals`);
}

getAllDepartment(){
    return this.http.get<Department[]>(`${baseUrl}/departments`);

}

getFilteredDepartment(hospitalname:any){
    // const params = new HttpParams().set('params', hospitalname);
    return this.http.get<Department[]>(`${baseUrl}/filteredDepartments/${hospitalname}`); 
}

// ADD, POST METHOD
addIssue (Hospital: Hospital): void {
    this.dialogData = Hospital;
  }

    // DELETE METHOD
deleteIssue (hospitalname: any) {
      return this.http.delete((`${baseUrl}/deleteHospital/${hospitalname}`))
      }
    

}