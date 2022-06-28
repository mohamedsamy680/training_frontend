import { IDepartmentModel } from "../departments/department";

export interface IJobTitleViewModel {
    jobTitleId: number;
    nameAr: string;
    nameEn: string;
    departments: IDepartmentModel[];
}

export interface IJobTitleAddEditModel {
    jobTitleId: number;
    nameAr: string;
    nameEn: string;
    departmentIds: number[];
}