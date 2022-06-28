import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DepartmentComponent } from './pages/department/department.component';
import { JobTitleComponent } from './pages/job-title/job-title.component';
import { CourseCategoryComponent } from './pages/course-category/course-category.component';

import { SETUP_ROUTES } from './set-up-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  entryComponents: [
  ],
  declarations: [
    DepartmentComponent,
    JobTitleComponent,
    CourseCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SETUP_ROUTES),
    SharedModule
  ]
})
export class SetUpModule { }
