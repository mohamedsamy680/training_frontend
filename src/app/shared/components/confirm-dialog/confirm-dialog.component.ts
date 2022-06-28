import { Component, OnInit, Inject } from '@angular/core';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'portal-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  confirmMsg: string;
  //TODO: wait for mat module
  //constructor(@Inject(MAT_DIALOG_DATA) data: any) { this.confirmMsg = data.confirmMsg }
  constructor() {}

  ngOnInit(): void {
  }

}
