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

import { IJobTitleAddEditModel, IJobTitleViewModel } from 'app/back-end/models-services/models/setup/job-title/job-title';
import { JobTitleService } from 'app/back-end/models-services/services/setUp/jobTitle/job-title.service';
import { IDepartmentModel, IIsDeletedSuccessModel } from 'app/back-end/models-services/models/setup/departments/department';
import { SUCCESS_DELETE_EN } from 'app/shared/data/msg-texts';
import { DepartmentService } from 'app/back-end/models-services/services/setup/department/department.service';



@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent extends BackBaseComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('btnReset', { static: true }) btnReset: ElementRef<HTMLElement>;

  saveEditString: string = 'Create job Title';
  saveButtonString: string = 'Save';

  jobTitles: IJobTitleViewModel[] = [];
  departments: IDepartmentModel[] = [];

  dataSource: MatTableDataSource<IJobTitleViewModel> = new MatTableDataSource<IJobTitleViewModel>();
  displayedColumns: string[] =
    [
      'jobTitleId',
      'nameAr',
      'nameEn',
      'departments',
      'edit',
      'delete'
    ];

  @ViewChild((MatPaginator) as any, { static: true }) paginator: MatPaginator;
  @ViewChild((MatSort) as any, { static: true }) sort: MatSort;


  get jobTitleIdCtrl() { return this.myForm.get('jobTitleId'); }
  get nameArCtrl() { return this.myForm.get('nameAr'); }
  get nameEnCtrl() { return this.myForm.get('nameEn'); }
  get departmentsCtrl() { return this.myForm.get('departments'); }


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private msg: MsgService,
    private fb: FormBuilder,
    private jobTitleService: JobTitleService,
    private departmentService: DepartmentService
  ) {
    super(dialog, msg, spinner);
  }

  ngOnInit(): void {

    this.myForm = this.fb.group(
      {
        jobTitleId: [null],
        nameAr: ['', [Validators.required, , Validators.maxLength(50)]],
        nameEn: ['', [Validators.required, , Validators.maxLength(50)]],
        departments: ['', Validators.required]
      }
    );


    this.load;
    this.departmentService.getAllDepartments<IDepartmentModel[]>().subscribe(response => {
      this.hide;

      //console.log("DEPARTMENTS: ", response);

      if (response && response.length > 0) {
        this.departments = response;
      }
    }, error => {
      this.hide;
      this.dataSource = null;
      this.msg.handleErrorV2(error);
    });


    this.load;
    this.jobTitleService.getAllJobTitles<IJobTitleViewModel[]>().subscribe(response => {
      this.hide;

      //console.log("JOB TITLES: ", response);

      if (response && response.length > 0) {

        this.jobTitles = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.msg.showSuccess('Show all Job Titles success');
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
    this.saveEditString = 'Create Job Title';
    this.saveButtonString = 'Save';
  }

  onAdd() {
  }


  onEdit(upd: IJobTitleViewModel) {
    this.jobTitleIdCtrl.setValue(upd.jobTitleId);
    this.nameArCtrl.setValue(upd.nameAr);
    this.nameEnCtrl.setValue(upd.nameEn);
    this.departmentsCtrl.setValue(upd.departments.map(d => d.departmentId));

    this.saveEditString = 'Edit Job Title';
    this.saveButtonString = 'Edit';
  }


  onDelete(del: IJobTitleViewModel) {
    this.confirmDelete(del.nameEn).subscribe(result => {
      if (result && result == 'true') {
        this.delete(del);
      }
    });
  }


  delete(del: IJobTitleViewModel) {
    this.load;
    this.jobTitleService.deleteJobTitle<IIsDeletedSuccessModel>(del.jobTitleId).subscribe(response => {
      if (response) {
        this.hide;

        let x = this.jobTitles.findIndex((e => e.jobTitleId === del.jobTitleId) as any);
        this.jobTitles.splice(x, 1);

        this.dataSource = new MatTableDataSource(this.jobTitles);
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
      let obj = {} as IJobTitleAddEditModel;
      obj.nameAr = this.nameArCtrl.value;
      obj.nameEn = this.nameEnCtrl.value;
      obj.departmentIds = [];

      obj.departmentIds = this.departmentsCtrl.value;

      if (this.jobTitleIdCtrl.value && this.jobTitleIdCtrl.value !== 0) {
        obj.jobTitleId = this.jobTitleIdCtrl.value;

        this.edit(obj);
      } else {
        this.create(obj);
      }

    } else {
      this.msg.showWarning("Invalid Form Data");
    }
  }


  create(obj: IJobTitleAddEditModel) {
    this.load;
    this.jobTitleService.saveJobTitle<IJobTitleAddEditModel, IJobTitleViewModel>(obj)
      .subscribe(response => {
        this.hide;
        if (response.jobTitleId > 0) {

          this.jobTitles.push(response);
          this.dataSource = new MatTableDataSource(this.jobTitles);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.msg.showSuccess("Job Title has been added successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }


  edit(obj: IJobTitleAddEditModel) {
    this.load;
    this.jobTitleService.updateJobTitle<IJobTitleAddEditModel, IJobTitleViewModel>(obj.jobTitleId, obj)
      .subscribe(response => {
        this.hide;
        if (response.jobTitleId > 0) {

          let x = this.jobTitles.findIndex((e => e.jobTitleId === response.jobTitleId) as any);
          this.jobTitles[x] = response;
          this.dataSource = new MatTableDataSource(this.jobTitles);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.saveEditString = 'Create Job Title';
          this.saveButtonString = 'Save';
          this.msg.showSuccess("Job Title has been updated successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }

}
