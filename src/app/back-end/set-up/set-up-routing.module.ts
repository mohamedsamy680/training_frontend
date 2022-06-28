import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentComponent } from './pages/department/department.component';
import { JobTitleComponent } from './pages/job-title/job-title.component';
import { CourseCategoryComponent } from './pages/course-category/course-category.component';

export const SETUP_ROUTES: Routes = [
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'job-title',
    component: JobTitleComponent
  },
  {
    path: 'course-category',
    component: CourseCategoryComponent
  }

];

