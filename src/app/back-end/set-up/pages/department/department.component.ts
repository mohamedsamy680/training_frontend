import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { MsgService } from '../../../../shared/services/msg.service';
import { BackBaseComponent } from '../../../../shared/back-base/back-base.component';

import { DepartmentService } from '../../../models-services/services/setup/department/department.service';
import { SUCCESS_DELETE_EN } from '../../../../shared/data/msg-texts';
import { IDepartmentModel, IIsDeletedSuccessModel } from 'app/back-end/models-services/models/setup/departments/department';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends BackBaseComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('btnReset', { static: true }) btnReset: ElementRef<HTMLElement>;

  saveEditString: string = 'Create Department';
  saveButtonString: string = 'Save';

  departments: IDepartmentModel[] = [];

  dataSource: MatTableDataSource<IDepartmentModel> = new MatTableDataSource<IDepartmentModel>();
  displayedColumns: string[] =
    [
      'departmentId',
      'nameAr',
      'nameEn',
      'edit',
      'delete'
    ];

  @ViewChild((MatPaginator) as any, { static: true }) paginator: MatPaginator;
  @ViewChild((MatSort) as any, { static: true }) sort: MatSort;

  get departmentIdCtrl() { return this.myForm.get('departmentId'); }
  get nameArCtrl() { return this.myForm.get('nameAr'); }
  get nameEnCtrl() { return this.myForm.get('nameEn'); }


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private msg: MsgService,
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {
    super(dialog, msg, spinner);
  }

  ngOnInit(): void {

    this.myForm = this.fb.group(
      {
        departmentId: [null],
        nameAr: ['', [Validators.required, , Validators.maxLength(50)]],
        nameEn: ['', [Validators.required, , Validators.maxLength(50)]]
      }
    );


    this.load;
    this.departmentService.getAllDepartments<IDepartmentModel[]>().subscribe(response => {
      this.hide;

      console.log("DEPARTMENTS: ", response);

      if (response && response.length > 0) {

        this.departments = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.msg.showSuccess('Show all Departments success');
      }
    }, error => {
      this.hide;
      this.dataSource = null;
      this.msg.handleErrorV2(error);
    });

  }

  onBack() {
    this.router.navigate(['/training/home']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClear() {
    this.btnReset.nativeElement.click();
    this.saveEditString = 'Create Department';
    this.saveButtonString = 'Save';
  }

  onAdd() {
  }

  onEdit(upd: IDepartmentModel) {
    this.departmentIdCtrl.setValue(upd.departmentId);
    this.nameArCtrl.setValue(upd.nameAr);
    this.nameEnCtrl.setValue(upd.nameEn);

    this.saveEditString = 'Edit Department';
    this.saveButtonString = 'Edit';
  }


  onDelete(del: IDepartmentModel) {
    this.confirmDelete(del.nameEn).subscribe(result => {
      if (result && result == 'true') {
        this.delete(del);
      }
    });
  }


  delete(del: IDepartmentModel) {
    this.load;
    this.departmentService.deleteDepartment<IIsDeletedSuccessModel>(del.departmentId).subscribe(response => {
      if (response) {
        this.hide;

        let x = this.departments.findIndex((e => e.departmentId === del.departmentId) as any);
        this.departments.splice(x, 1);

        //let i = this.dataSource.data.findIndex((e => e.customerId === del.customerId) as any);
        //this.dataSource.data.splice(i, 1);
        this.dataSource = new MatTableDataSource(this.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.msg.showSuccess(SUCCESS_DELETE_EN);
      }
    }, error => {
      this.hide;
      this.msg.handleErrorV2(error);
    });
  }


  onSubmit() {

    if (this.myForm.valid) {
      let obj = {} as IDepartmentModel;
      obj.nameAr = this.nameArCtrl.value;
      obj.nameEn = this.nameEnCtrl.value;


      if (this.departmentIdCtrl.value && this.departmentIdCtrl.value !== 0) {
        obj.departmentId = this.departmentIdCtrl.value;

        this.edit(obj);
      } else {
        this.create(obj);
      }

    } else {
      this.msg.showWarning("Invalid Form Data");
    }

  }


  create(obj: IDepartmentModel) {
    this.load;
    this.departmentService.saveDepartment<IDepartmentModel, IDepartmentModel>(obj)
      .subscribe(response => {
        this.hide;
        if (response.departmentId > 0) {

          this.departments.push(response);
          this.dataSource = new MatTableDataSource(this.departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.msg.showSuccess("Department has been added successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }


  edit(obj: IDepartmentModel) {
    this.load;
    this.departmentService.updateDepartment<IDepartmentModel, IDepartmentModel>(obj.departmentId, obj)
      .subscribe(response => {
        this.hide;
        if (response.departmentId > 0) {

          let x = this.departments.findIndex((e => e.departmentId === response.departmentId) as any);
          this.departments[x] = response;
          this.dataSource = new MatTableDataSource(this.departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.saveEditString = 'Create Department';
          this.saveButtonString = 'Save';
          this.msg.showSuccess("Department has been updated successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }


}
