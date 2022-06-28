import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'portal-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  toDelete: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) { this.toDelete = data.delString }

    ngOnInit(): void {
    }

}
