import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {HospitalService} from '../../_services/hospital.services';
import {FormControl, Validators} from '@angular/forms';
import {Hospital} from '../../shared/hospital';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Hospital,
              public HospitalService: HospitalService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

 
  submit() {
  // emppty stuff
  }

  onNoClick() {
    this.dialogRef.close();
  }

  public confirmAdd() {
    this.HospitalService.addIssue(this.data);
  }
}