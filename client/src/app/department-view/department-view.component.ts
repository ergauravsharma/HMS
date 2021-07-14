import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Department } from './../shared/department';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { HospitalService } from '../_services/hospital.services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  isLoading = true;
  hospitalData: any = [];
  home?:any;
  id?: string;


  dataSourceToday = new MatTableDataSource<Department>(this.hospitalData);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumnsToday: string[] = [
   "departmentname",
   "head",
   "contactnumber", 
   "action2",
   "action3"
  ];
  constructor(
    private hospitalServices : HospitalService,
    private actRoute: ActivatedRoute,
    private router: Router,

  ) { 
    this.home = this.actRoute.snapshot.paramMap.get('hospitalname');
    console.log(this.home)

  }

  ngOnInit(): void {
    
    this.hospitalServices.getFilteredDepartment(this.home).subscribe((data:any) => {
      this.hospitalData = data;
      this.dataSourceToday = new MatTableDataSource<Department>(this.hospitalData);
      this.hospitalData.sort = this.sort;
      this.dataSourceToday.sort = this.sort;
      setTimeout(() => {
        this.dataSourceToday.paginator = this.paginator;
      }, 0);
    });
  }

  navigateBack() {
    this.router.navigate(['/']);
}


}
