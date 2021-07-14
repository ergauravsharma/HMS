import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Hospital } from './../shared/hospital';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { HospitalService } from '../_services/hospital.services';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import {Sort} from '@angular/material/sort';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.css'],
})
export class HospitalViewComponent implements OnInit {
  isLoading = true;
  hospitalData: any = [];
  index?: number;
  home?: any;
  // requestForm?:FormGroup;

  

  dataSourceToday = new MatTableDataSource<Hospital>(this.hospitalData);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table?: MatTable<any>;

  displayedColumnsToday: string[] = [
    'hospitalname',
    'contactnumber',
    'action',
    'action2',
    'action3',
    
  ];
  constructor(
    private hospitalServices: HospitalService,
    public dialog: MatDialog,
    // public fb: FormBuilder,

  ) {}

  ngOnInit(): void {

    // this.requestForm = this.fb.group({
    //   hospitalname: ['',[Validators.required]],        
    //   contactnumber:['',[Validators.required]],   
    // })

    this.hospitalServices.getAllHospital().subscribe((data: any) => {
      this.hospitalData = data;
      this.dataSourceToday = new MatTableDataSource<Hospital>(
        this.hospitalData
      );
      this.hospitalData.sort = this.sort;
      this.dataSourceToday.sort = this.sort;
      setTimeout(() => {
        this.dataSourceToday.paginator = this.paginator;
      }, 0);
    });
  }

 

  deleteItem(hospitalname: string, contactnumber: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { hospitalname: hospitalname, contactnumber: contactnumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.hospitalServices.deleteIssue(hospitalname).subscribe(() => {
          console.log('Data Deleted'), this.refreshTable();
        });
      }
    });
  }

  addNew(){

  }


  refreshTable() {
    //Generating Mattable with callback data.
    this.hospitalServices.getAllHospital().subscribe((data: any) => {
      this.hospitalData = data;
      this.dataSourceToday = new MatTableDataSource<Hospital>(
        this.hospitalData
      );
      setTimeout(() => {
        this.dataSourceToday.paginator = this.paginator;
        this.hospitalData.sort = this.sort;
      }, 0);
    });
  }

  onRequestSubmit(){

  }




}




