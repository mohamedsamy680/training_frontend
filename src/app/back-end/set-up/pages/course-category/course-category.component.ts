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

import { ICategoryModel } from 'app/back-end/models-services/models/setup/category/category';
import { CategoryService } from 'app/back-end/models-services/services/setUp/category/category.service';
import { IIsDeletedSuccessModel } from 'app/back-end/models-services/models/setup/departments/department';
import { SUCCESS_DELETE_EN } from 'app/shared/data/msg-texts';


@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.scss']
})
export class CourseCategoryComponent extends BackBaseComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('btnReset', { static: true }) btnReset: ElementRef<HTMLElement>;

  saveEditString: string = 'Create Category';
  saveButtonString: string = 'Save';

  categories: ICategoryModel[] = [];

  dataSource: MatTableDataSource<ICategoryModel> = new MatTableDataSource<ICategoryModel>();
  displayedColumns: string[] =
    [
      'categoryId',
      'nameAr',
      'nameEn',
      'edit',
      'delete'
    ];

  @ViewChild((MatPaginator) as any, { static: true }) paginator: MatPaginator;
  @ViewChild((MatSort) as any, { static: true }) sort: MatSort;

  get categoryIdCtrl() { return this.myForm.get('categoryId'); }
  get nameArCtrl() { return this.myForm.get('nameAr'); }
  get nameEnCtrl() { return this.myForm.get('nameEn'); }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private msg: MsgService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    super(dialog, msg, spinner);
  }

  ngOnInit(): void {

    this.myForm = this.fb.group(
      {
        categoryId: [null],
        nameAr: ['', [Validators.required, , Validators.maxLength(50)]],
        nameEn: ['', [Validators.required, , Validators.maxLength(50)]]
      }
    );


    this.load;
    this.categoryService.getAllCategories<ICategoryModel[]>().subscribe(response => {
      this.hide;

      //console.log("CATEGORIES: ", response);

      if (response && response.length > 0) {

        this.categories = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.msg.showSuccess('Show all Categories success');
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
    this.saveEditString = 'Create Category';
    this.saveButtonString = 'Save';
  }

  onAdd() {
  }


  onEdit(upd: ICategoryModel) {
    this.categoryIdCtrl.setValue(upd.categoryId);
    this.nameArCtrl.setValue(upd.nameAr);
    this.nameEnCtrl.setValue(upd.nameEn);

    this.saveEditString = 'Edit Category';
    this.saveButtonString = 'Edit';
  }


  onDelete(del: ICategoryModel) {
    this.confirmDelete(del.nameEn).subscribe(result => {
      if (result && result == 'true') {
        this.delete(del);
      }
    });
  }


  delete(del: ICategoryModel) {
    this.load;
    this.categoryService.deleteCategory<IIsDeletedSuccessModel>(del.categoryId).subscribe(response => {
      if (response) {
        this.hide;

        let x = this.categories.findIndex((e => e.categoryId === del.categoryId) as any);
        this.categories.splice(x, 1);

        this.dataSource = new MatTableDataSource(this.categories);
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
      let obj = {} as ICategoryModel;
      obj.nameAr = this.nameArCtrl.value;
      obj.nameEn = this.nameEnCtrl.value;


      if (this.categoryIdCtrl.value && this.categoryIdCtrl.value !== 0) {
        obj.categoryId = this.categoryIdCtrl.value;

        this.edit(obj);
      } else {
        this.create(obj);
      }

    } else {
      this.msg.showWarning("Invalid Form Data");
    }

  }


  create(obj: ICategoryModel) {
    this.load;
    this.categoryService.saveCategory<ICategoryModel, ICategoryModel>(obj)
      .subscribe(response => {
        this.hide;
        if (response.categoryId > 0) {

          this.categories.push(response);
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.msg.showSuccess("Category has been added successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }


  edit(obj: ICategoryModel) {
    this.load;
    this.categoryService.updateCategory<ICategoryModel, ICategoryModel>(obj.categoryId, obj)
      .subscribe(response => {
        this.hide;
        if (response.categoryId > 0) {

          let x = this.categories.findIndex((e => e.categoryId === response.categoryId) as any);
          this.categories[x] = response;
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.onClear();
          this.saveEditString = 'Create Category';
          this.saveButtonString = 'Save';
          this.msg.showSuccess("Category has been updated successfully");
        }

      }, error => {
        this.hide;
        console.log("ERROR: ", error);
        this.msg.showErrorSamy(error);
      });
  }

}
